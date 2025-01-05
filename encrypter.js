const Encrypter = {
    stringToBytes: (text) => Array.from(new TextEncoder().encode(text)),
    bytesToString: (bytes) => new TextDecoder().decode(new Uint8Array(bytes)),
    base64Encode: (bytes) => btoa(String.fromCharCode.apply(null, bytes)),
    base64Decode(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return Array.from(bytes);
    },

    encrypt(text, key = "SHIREN6") {
        const textBytes = this.stringToBytes(text);
        const keyBytes = this.stringToBytes(key);

        const keyRepeated = [];
        for (let i = 0; i < textBytes.length; i++) {
            keyRepeated[i] = keyBytes[i % keyBytes.length];
        }

        const encryptedBytes = [];
        for (let i = 0; i < textBytes.length; i++) {
            encryptedBytes[i] = textBytes[i] ^ keyRepeated[i];
        }
        return this.base64Encode(encryptedBytes);
    },

    decrypt(encryptedText, key = "SHIREN6") {
        try {
            const encryptedBytes = this.base64Decode(encryptedText);
            const keyBytes = this.stringToBytes(key);

            const keyRepeated = [];
            for (let i = 0; i < encryptedBytes.length; i++) {
                keyRepeated[i] = keyBytes[i % keyBytes.length];
            }

            const decryptedBytes = [];
            for (let i = 0; i < encryptedBytes.length; i++) {
                decryptedBytes[i] = encryptedBytes[i] ^ keyRepeated[i];
            }

            return this.bytesToString(decryptedBytes);

        } catch (e) {
            console.error('復号化エラー:', e);
            return null;
        }
    },
};