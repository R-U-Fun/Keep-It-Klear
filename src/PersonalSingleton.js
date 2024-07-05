class PersonalSingleton {
	constructor() {
		if (!PersonalSingleton.instance) {
			this.CurrentPersonal = null;
			PersonalSingleton.instance = this;
		}

		return PersonalSingleton.instance;
	}

	setPersonal(CurrentPersonal) {
		this.CurrentPersonal = CurrentPersonal;
	}

	getPersonal() {
		return this.CurrentPersonal;
	}
}

const CurrentPersonalSingleton = new PersonalSingleton();
export default CurrentPersonalSingleton;
