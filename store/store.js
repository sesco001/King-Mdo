const fs = require("fs")
const chalk = require("chalk")
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
        this.callOffer = {}
        this.stickerPacks = {}
        this.authState = {}
        this.syncedHistory = {}
        this.logger = options?.logger || pino({ level: 'silent' })
    }

    // ✅ ADDED: Method to load data from the json file
    readFromFile(filename = './store/store.json') {
        if (fs.existsSync(filename)) {
            try {
                const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
                this.load(data);
                this.logger.info(`Store loaded from ${filename}`);
            } catch (e) {
                this.logger.error(`Error reading store file: ${e.message}`);
            }
        }
    }

    load(state) {
        Object.assign(this, state)
        this.logger.info('Store loaded into memory')
    }

    save() {
        return {
            contacts: this.contacts,
            chats: this.chats,
            messages: this.messages,
            presences: this.presences,
            groupMetadata: this.groupMetadata,
            callOffer: this.callOffer,
            stickerPacks: this.stickerPacks,
            authState: this.authState,
            syncedHistory: this.syncedHistory,
        }
    }

    writeToFile(filename = './store/store.json') {
        try {
            const data = this.save();
            // Ensure directory exists
            const dir = './store';
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            
            fs.writeFileSync(filename, JSON.stringify(data, null, 2));
            this.logger.info(`Store written to ${filename}`);
        } catch (e) {
            this.logger.error(`Error writing store file: ${e.message}`);
        }
    }

    // ... (Keep all your other methods like clear, setContacts, upsertMessage, bind, etc. exactly as they were)
    
    // ✅ ADDED: Auto-clear for memory stability (Removes messages older than 24 hours)
    clearOldMessages(maxAgeMs = 86400000) {
        const now = Date.now();
        Object.keys(this.messages).forEach(jid => {
            Object.keys(this.messages[jid]).forEach(id => {
                const msg = this.messages[jid][id];
                const msgTime = msg.messageTimestamp * 1000 || now;
                if (now - msgTime > maxAgeMs) {
                    delete this.messages[jid][id];
                }
            });
            if (Object.keys(this.messages[jid]).length === 0) delete this.messages[jid];
        });
    }

    bind(ev) {
        ev.on('contacts.set', (contacts) => this.setContacts(contacts))
        ev.on('contacts.upsert', (contacts) => contacts.forEach(this.upsertContact.bind(this)))
        ev.on('contacts.update', this.updateContact.bind(this))
        ev.on('contacts.delete', this.deleteContact.bind(this))
        ev.on('chats.set', (chats) => this.setChats(chats))
        ev.on('chats.upsert', (chats) => chats.forEach(this.upsertChat.bind(this)))
        ev.on('chats.update', this.updateChat.bind(this))
        ev.on('chats.delete', (ids) => this.deleteChat(ids))
        ev.on('messages.set', ({ messages, jid }) => this.setMessages(jid, messages))
        ev.on('messages.upsert', ({ messages, type }) => messages.forEach(msg => this.upsertMessage(msg, type)))
        ev.on('messages.update', this.updateMessage.bind(this))
        ev.on('messages.delete', (keys) => this.deleteMessage(keys))
        ev.on('presence.set', ({ id, presence }) => this.setPresence(id, presence))
        ev.on('presence.update', ({ id, presence }) => this.updatePresence(id, presence))
        ev.on('groups.update', this.updateGroupMetadata.bind(this))
        ev.on('groups.upsert', (groups) => groups.forEach(group => this.setGroupMetadata(group.id, group)))
        ev.on('auth-state.update', (state) => this.setAuthState(state))
    }
}

function makeInMemoryStore(options) {
    return new InMemoryStore(options)
}

module.exports = makeInMemoryStore
