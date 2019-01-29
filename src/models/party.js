import uuid from 'uuid';
import partyDb from '../db/partydb';

class Party{
    /**
   * 
   * @param {uuid} id
   * @returns {object} reflection object
   */
  findOne(id) {
    return partyDb.find(party => party.id === id);
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const party = this.findOne(id);
    const index = partyDb.indexOf(party);
    this.partyDb[index].name = data['name'] || party.name;
    this.partyDb[index].hqaddress = data['hqaddress'] || party.hqaddress;
    this.partyDb[index].logoURL = data['logoURL'] || party.logoURL;
    return this.partyDb[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const party = this.findOne(id);
    const index = this.partyDb.indexOf(party);
    this.partyDb.splice(index, 1);
    return {};
  }
}

export default Party;