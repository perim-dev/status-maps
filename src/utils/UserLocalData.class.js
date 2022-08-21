import LocalData from "./LocalData";

class UserLocalData {
    acervos = []
    optionsSelected = []
    constructor() {
        const localData = LocalData.ler();
        this.acervos = localData.acervos || [];
        this.optionsSelected = localData.optionsSelected || [];
    }

    getAcervoLocalDataById(acervoId) {

        let acervosLocalData = this.acervos.filter(a => a.id === acervoId);
        return acervosLocalData.length > 0 ? acervosLocalData[0] : null;

    }

    addAcervo({ id, agrupado = true }) {

        this.acervos.push({ id, agrupado });

    }

    setOption(optionName, value) {
        let optionSelected = this.optionsSelected.find(os => os.optionName === optionName);
        if (optionSelected) {
            optionSelected.value = value
        } else {
            this.optionsSelected.push({ optionName, value });
        }
        this.salvar()
    }

    getOption(optionName) {
        const optionSelected = this.optionsSelected.find(os => os.optionName === optionName);
        return optionSelected ? optionSelected.value : null;
    }

    salvar() {
        const configuracao = { acervos: this.acervos, optionsSelected: this.optionsSelected }
        LocalData.salvar(configuracao);
    }
}

export default UserLocalData;