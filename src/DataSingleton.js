class DataSingleton {
	constructor() {
		if (!DataSingleton.instance) {
			this.CurrentData = null;
			DataSingleton.instance = this;
		}

		return DataSingleton.instance;
	}

	setData(CurrentData) {
		this.CurrentData = CurrentData;
	}

	getData() {
		return this.CurrentData;
	}
}

const CurrentDataSingleton = new DataSingleton();
export default CurrentDataSingleton;