export default class Hole {
	constructor(cup, walls, zones, slopes, startZone, par) {
		this.cup = cup;
		this.walls = walls;
		this.zones = zones;
		this.slopes = slopes;
		this.startZone = startZone;
		this.par = par;
		this.strokeCount = 0;
	}
}