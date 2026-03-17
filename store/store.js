const fs = require("fs")
const events = require('events')
const pino = require('pino')

class InMemoryStore extends events.EventEmitter {
    constructor(options) {
        super()
        this.contacts = {}
        this.chats = {}
        this.messages = {}
        this.presences = {}
        this.groupMetadata = {}
        this.logger = options?.logger || pino({ level: 'silent' })
    }

    // ✅ FIXED: Ensure this function exists
    updateContact(update) {
        for (const contact of update) {
            if (this.contacts[contact.id]) {
                this.contacts[contact.id] = { ...this.contacts[contact.id], ...contact }
            }
        }
    }

    // ✅ FIXED: Ensure this function exists
    upsertContact(contact) {
        this.contacts[contact.id] = { ...this.contacts[contact.id], ...contact }
    }

    // ✅ Added helper for index.js
    readFromFile(filename) {
        if (fs.existsSync(filename)) {
            const data = JSON.parse(fs.readFileSync(filename, 'utf-8'))
            this.contacts = data.contacts || {}
            this.chats = data.chats || {}
            this.messages = data.messages || {}
        }
    }

    writeToFile(filename) {
        const data = {
            contacts: this.contacts,
            chats: this.chats,
            messages: this.messages
        }
        fs.writeFileSync(filename, JSON.stringify(data, null, 2))
    }

    bind(ev) {
        // These lines were causing the crash because the functions were undefined
        ev.on('contacts.set', (contacts) => { this.contacts = contacts })
        ev.on('contacts.upsert', (contacts) => contacts.forEach(c => this.upsertContact(c)))
        ev.on('contacts.update', (update) => this.updateContact(update))
        
        ev.on('chats.set', (chats) => { this.chats = chats })
        ev.on('chats.upsert', (chats) => chats.forEach(c => { this.chats[c.id] = c }))
        
        ev.on('messages.upsert', ({ messages }) => {
            messages.forEach(msg => {
                const jid = msg.key.remoteJid
                if (!this.messages[jid]) this.messages[jid] = {}
                this.messages[jid][msg.key.id] = msg
            })
        })
    }
}

module.exports = (options) => new InMemoryStore(options)
