
# Web3 Wallet Hacking

## 🧠 Overview

This is a Node.js script that continuously monitors the balance of a specific Ethereum wallet. If the balance becomes greater than the estimated gas cost, it automatically attempts to transfer all ETH to another address.

---

## 📦 Requirements

- Node.js (v14+ recommended)
- An Infura account
- A valid BIP-39 mnemonic

---

## 🚀 Installation

```bash
git clone https://github.com/rsoft-latam/web3-wallet-hacking.git
cd web3-wallet-hacking
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
MNEMONIC="your twelve word phrase here"
INFURA_API_KEY="your_infura_project_id"
```

---

## 📂 File Structure

```
├── server.js            # Main script
├── .env.example         # Template for your env variables
├── .gitignore
├── .package.json
└── README.md
```

---

## 🧪 Usage

You can run the bot using:

```bash
node server.js
```

---

## 📖 License

MIT License
