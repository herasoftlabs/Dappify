export function anchorToJson(anchorCode) {
    const idl = {
        version: "0.1.0",
        name: "",
        instructions: [],
        accounts: [],
        types: []
    };

    const lines = anchorCode.split("\n");
    let currentSection = "";
    let currentInstruction = null;

    lines.forEach((line) => {
        const trimmed = line.trim();

        // Extract program name
        if (trimmed.startsWith("pub mod")) {
            const match = trimmed.match(/pub mod ([a-zA-Z_]+)/);
            if (match) {
                idl.name = match[1];
            }
        }

        // Extract instructions
        if (trimmed.startsWith("pub fn")) {
            const instructionNameMatch = trimmed.match(/pub fn ([a-zA-Z_]+)/);
            if (instructionNameMatch) {
                currentSection = "instruction";
                currentInstruction = {
                    name: instructionNameMatch[1],
                    accounts: [],
                    args: []
                };
                idl.instructions.push(currentInstruction);
            }
        }

        // Extract context (accounts)
        if (currentSection === "instruction" && trimmed.startsWith("pub struct")) {
            currentSection = "context";
        }

        if (currentSection === "context" && trimmed.includes("#[account")) {
            const accountMatch = trimmed.match(/pub (\w+): (.+)/);
            if (accountMatch && currentInstruction) {
                currentInstruction.accounts.push({
                    name: accountMatch[1],
                    isMut: trimmed.includes("mut"),
                    isSigner: trimmed.includes("Signer")
                });
            }
        }

        // Extract account structures
        if (trimmed.startsWith("#[account]")) {
            currentSection = "account";
        }

        if (currentSection === "account" && trimmed.startsWith("pub struct")) {
            const accountNameMatch = trimmed.match(/pub struct (\w+)/);
            if (accountNameMatch) {
                idl.accounts.push({
                    name: accountNameMatch[1],
                    type: {
                        kind: "struct",
                        fields: []
                    }
                });
            }
        }

        if (currentSection === "account" && trimmed.includes(":")) {
            const fieldMatch = trimmed.match(/pub (\w+): (.+),/);
            if (fieldMatch) {
                idl.accounts[idl.accounts.length - 1].type.fields.push({
                    name: fieldMatch[1],
                    type: fieldMatch[2].replace(",", "")
                });
            }
        }

        // Extract enum types
        if (trimmed.startsWith("#[derive") && trimmed.includes("enum")) {
            currentSection = "enum";
        }

        if (currentSection === "enum" && trimmed.startsWith("pub enum")) {
            const enumNameMatch = trimmed.match(/pub enum (\w+)/);
            if (enumNameMatch) {
                idl.types.push({
                    name: enumNameMatch[1],
                    type: {
                        kind: "enum",
                        variants: []
                    }
                });
            }
        }

        if (currentSection === "enum" && trimmed.startsWith("    ")) {
            const variantMatch = trimmed.match(/(\w+)/);
            if (variantMatch) {
                idl.types[idl.types.length - 1].type.variants.push({
                    name: variantMatch[1]
                });
            }
        }
    });

    return idl;
}
