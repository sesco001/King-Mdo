# KING M - WhatsApp Multi-Device Bot

## Overview
A WhatsApp bot built with Node.js and the Baileys library. It connects to WhatsApp via multi-device support and provides automation features including auto-bio, auto-status reactions, anti-edit detection, anti-call, group event handling, and more.

## Project Structure
- `index.js` - Entry point (obfuscated loader that requires `peacemaker/index.js`)
- `peacemaker/index.js` - Main bot logic, Express web server, WhatsApp connection
- `peacemaker/auth.js` - Session authentication handler (obfuscated)
- `peacemaker/events.js` - Group event handler
- `peacemaker/peace.js` - Command handler
- `peacemaker/wee.js` - Additional utilities
- `set.js` - Configuration (port, owner, bot name, etc.)
- `Database/config.js` - Database setup (auto-detects PostgreSQL or SQLite)
- `Database/fetchSettings.js` - Settings fetcher
- `lib/` - Helper libraries (sticker, upload, image processing, etc.)
- `pixel/` - Static web UI (served via Express)
- `session/` - WhatsApp session credentials
- `store/` - In-memory message store

## Configuration
All configuration is in `set.js` and can be overridden via environment variables:
- `PORT` - Web server port (default: 5000)
- `SESSION` - Base64-encoded WhatsApp session credentials
- `DATABASE_URL` - PostgreSQL connection string (if set, uses PostgreSQL; otherwise SQLite)
- `DEV` - Owner phone number(s), comma-separated

## Database
- Uses PostgreSQL when `DATABASE_URL` environment variable is set
- Falls back to SQLite (`Database/database.db`) for local/panel deployments

## Web Server
- Express serves the `pixel/` folder as static files
- Listens on `0.0.0.0:5000` (port 5000)

## Workflows
- **Start application**: `node index.js` - Starts the bot and web server on port 5000

## Deployment
- Configured as `vm` type (always-running) since the bot needs persistent connection to WhatsApp
- Run command: `node index.js`
