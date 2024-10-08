export function jsonToAnchor(idl) {
    let anchorCode = "";

    
    idl.instructions.forEach((instruction) => {
      
        const params = instruction.parameters.map(param => `${param.name}: ${param.type}`).join(", ");
        const visibility = instruction.visibility === "private" ? "" : "pub";
        const returnType = instruction.returnType || "Result<()>";

       
        anchorCode += `${visibility ? `${visibility} ` : ""}fn ${instruction.name}(ctx: Context<${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}>${params ? `, ${params}` : ""}) -> ${returnType} {\n`;

        
        anchorCode += `    ${instruction.description ? instruction.description : "// TODO: Implement logic here"}\n`;
        anchorCode += `    Ok(())\n}\n}\n\n`;
    });

    
    idl.instructions.forEach((instruction) => {
        const lifetime = instruction.lifetime ? `<'${instruction.lifetime}>` : "";
        anchorCode += `#[derive(Accounts)]\n`;
        anchorCode += `pub struct ${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}${lifetime} {\n`;

        instruction.context.forEach((context) => {
            const contextAttributes = [];

            if (context.is_mut) {
                contextAttributes.push("mut");
            }
            if (context.is_signer) {
                contextAttributes.push("signer");
            }

            
            if (context.constraints) {
                if (context.constraints.init) {
                    contextAttributes.push(`init`);
                }
                if (context.constraints.payer) {
                    contextAttributes.push(`payer = ${context.constraints.payer}`);
                }
                if (context.constraints.space) {
                    contextAttributes.push(`space = ${context.constraints.space}`);
                }
            }

            const attributesString = contextAttributes.length > 0 ? `#[account(${contextAttributes.join(", ")})]` : "";

            const lifetimeStr = context.isLifeTime && instruction.lifetime ? `${instruction.lifetime}` : "";

            let contextTypeCode = "";

            switch (context.type) {
                case "Account":
                    const dataId = context.data ? context.data : "null";
                    const dataAccount = idl.accounts.find(account => account.id === dataId);
                    const dataAccountName = dataAccount ? dataAccount.name : dataId;
                    contextTypeCode = context.isLifeTime ? `Account<${lifetimeStr}, ${dataAccountName}>` : `Account<${dataAccountName}>`;
                    break;
                case "Program":
                    contextTypeCode = context.isLifeTime ? `Program<'${lifetimeStr}, System>` : `Program<System>`;
                    break;
                case "Signer":
                    contextTypeCode = context.isLifeTime ? `Signer<'${lifetimeStr}>` : `Signer`;
                    break;
                default:
                    contextTypeCode = `${context.type}${lifetimeStr ? `<${lifetimeStr}>` : ""}`;
            }

            anchorCode += `    ${attributesString}\n`;
            anchorCode += `    pub ${context.name}: ${contextTypeCode},\n\n`;
        });

        anchorCode += `}\n\n`;
    });

    return anchorCode;
}
