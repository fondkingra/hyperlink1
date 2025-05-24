const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {
    // Core functions only
    async CreateAsset(ctx, id, owner, value, description) {
        const asset = { id, owner, value, description };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return asset;
    }

    async TransferAsset(ctx, id, newOwner) {
        const asset = JSON.parse(await this.ReadAsset(ctx, id));
        asset.owner = newOwner;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return asset;
    }

    async ReadAsset(ctx, id) {
        const data = await ctx.stub.getState(id);
        if (!data || data.length === 0) throw new Error(`Asset ${id} not found`);
        return data.toString();
    }
}