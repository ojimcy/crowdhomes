export default class MatrixNode {
    id = 0;
    level = 0;

    left = {};
    right = {};

    load = async (id, level, blockLevel, contract) => {
        if (!id) return;
        this.id = id;
        if (blockLevel <= 0) return;

        let legs;
        try {
            legs = await contract.getDirectLegs(id, basePartLevel(level));
            this.left = new MatrixNode();
            this.left.id = parseInt(legs.left);
            this.left.level = parseInt(legs.leftLevel);

            if (parseInt(legs.right) > 0) {
                this.right = new MatrixNode();
                this.right.id = parseInt(legs.right);
                this.right.level = parseInt(legs.rightLevel);
            }
        } catch (error) {
            window.premiumContract = contract;
            console.log(error);
            console.log('call', blockLevel, id, basePartLevel(level));
            return;
        }

        if (parseInt(legs.left) > 0) {
            this.left.load(parseInt(legs.left), level, blockLevel - 1, contract);
        }

        if (parseInt(legs.right) > 0) {
            this.right.load(parseInt(legs.right), level, blockLevel - 1, contract);
        }
        this.loaded = true;
    };
}

const basePartLevel = (level) => {
    if (level < 3) {
        return 1;
    }
    if (level < 6) {
        return 3;
    }
    if (level < 9) {
        return 6;
    }
    if (level < 12) {
        return 9;
    }
    if (level < 15) {
        return 12;
    }
    return 15;
};
