//EXPERIMENTAL

const { SAVE_PROJECT } = require("../action-types")

const saveProject = (state) => {
    return {
        type: SAVE_PROJECT,
        state: state,
    }
}