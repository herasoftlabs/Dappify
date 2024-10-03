export function jsonToAnchor(idl) {
    let anchorCode = `use anchor_lang::prelude::*;\n\ndeclare_id!("YourProgramIDHere");\n\n`;

    // Generate program module
    anchorCode += `#[program]\npub mod ${idl.name} {\n    use super::*;\n\n`;

    idl.instructions.forEach((instruction) => {
        anchorCode += `    pub fn ${instruction.name}(ctx: Context<${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}>) -> Result<()> {\n`;
        anchorCode += `        // TODO: Implement logic here\n`;
        anchorCode += `        Ok(())\n    }\n\n`;
    });
    anchorCode += `}\n\n`;

    // Generate context structs
    idl.instructions.forEach((instruction) => {
        anchorCode += `#[derive(Accounts)]\n`;
        anchorCode += `pub struct ${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}<'info> {\n`;
        instruction.accounts.forEach((account) => {
            anchorCode += `    #[account(${account.isMut ? "mut, " : ""}${account.isSigner ? "signer" : ""})]\n`;
            anchorCode += `    pub ${account.name}: ${account.isMut ? "Account" : "Program"}<'info, ${account.isSigner ? "Signer" : "System"}>,\n`;
        });
        anchorCode += `}\n\n`;
    });

    // Generate account structs
    idl.accounts.forEach((account) => {
        anchorCode += `#[account]\n#[derive(Default)]\n`;
        anchorCode += `pub struct ${account.name} {\n`;
        account.type.fields.forEach((field) => {
            anchorCode += `    pub ${field.name}: ${field.type},\n`;
        });
        anchorCode += `}\n\n`;
    });

    // Generate enum types
    idl.types.forEach((type) => {
        if (type.type.kind === "enum") {
            anchorCode += `#[derive(AnchorSerialize, AnchorDeserialize)]\n`;
            anchorCode += `pub enum ${type.name} {\n`;
            type.type.variants.forEach((variant) => {
                anchorCode += `    ${variant.name},\n`;
            });
            anchorCode += `}\n\n`;
        }
    });

    return anchorCode;
}
