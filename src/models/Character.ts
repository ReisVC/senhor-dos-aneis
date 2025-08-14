export class Character {
    id: number;
    name: string;
    type: string;
    race: string;
    weapon: string;
    status: string;

	constructor($id: number, $name: string, $type: string, $race: string, $weapon: string, $status: string) {
		this.id = $id;
		this.name = $name;
		this.type = $type;
		this.race = $race;
		this.weapon = $weapon;
		this.status = $status;
	}

}