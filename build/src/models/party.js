'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Party = function () {
  function Party() {
    (0, _classCallCheck3.default)(this, Party);
  }

  (0, _createClass3.default)(Party, [{
    key: 'findOne',

    /**
    * 
    * @param {uuid} id
    * @returns {object} Party object
    */
    value: function findOne(id) {
      return _partydb2.default.find(function (party) {
        return party.id === Number(id);
      });
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data 
     */

  }, {
    key: 'update',
    value: function update(id, data) {
      var party = this.findOne(id);
      var index = _partydb2.default.indexOf(party);
      this.partyDb[index].name = data['name'] || party.name;
      this.partyDb[index].hqaddress = data['hqaddress'] || party.hqaddress;
      this.partyDb[index].logoURL = data['logoURL'] || party.logoURL;
      return this.partyDb[index];
    }
    /**
     * 
     * @param {uuid} id 
     */

  }, {
    key: 'delete',
    value: function _delete(id) {
      var party = this.findOne(id);
      var index = _partydb2.default.indexOf(party);
      _partydb2.default.splice(index, 1);
      return _partydb2.default;
    }
  }]);
  return Party;
}();

exports.default = Party;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvcGFydHkuanMiXSwibmFtZXMiOlsiUGFydHkiLCJpZCIsInBhcnR5RGIiLCJmaW5kIiwicGFydHkiLCJOdW1iZXIiLCJkYXRhIiwiZmluZE9uZSIsImluZGV4IiwiaW5kZXhPZiIsIm5hbWUiLCJocWFkZHJlc3MiLCJsb2dvVVJMIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVNQSxLOzs7Ozs7OztBQUNGOzs7Ozs0QkFLTUMsRSxFQUFJO0FBQ1YsYUFBT0Msa0JBQVFDLElBQVIsQ0FBYTtBQUFBLGVBQVNDLE1BQU1ILEVBQU4sS0FBYUksT0FBT0osRUFBUCxDQUF0QjtBQUFBLE9BQWIsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7OzJCQUtPQSxFLEVBQUlLLEksRUFBTTtBQUNmLFVBQU1GLFFBQVEsS0FBS0csT0FBTCxDQUFhTixFQUFiLENBQWQ7QUFDQSxVQUFNTyxRQUFRTixrQkFBUU8sT0FBUixDQUFnQkwsS0FBaEIsQ0FBZDtBQUNBLFdBQUtGLE9BQUwsQ0FBYU0sS0FBYixFQUFvQkUsSUFBcEIsR0FBMkJKLEtBQUssTUFBTCxLQUFnQkYsTUFBTU0sSUFBakQ7QUFDQSxXQUFLUixPQUFMLENBQWFNLEtBQWIsRUFBb0JHLFNBQXBCLEdBQWdDTCxLQUFLLFdBQUwsS0FBcUJGLE1BQU1PLFNBQTNEO0FBQ0EsV0FBS1QsT0FBTCxDQUFhTSxLQUFiLEVBQW9CSSxPQUFwQixHQUE4Qk4sS0FBSyxTQUFMLEtBQW1CRixNQUFNUSxPQUF2RDtBQUNBLGFBQU8sS0FBS1YsT0FBTCxDQUFhTSxLQUFiLENBQVA7QUFDRDtBQUNEOzs7Ozs7OzRCQUlPUCxFLEVBQUk7QUFDVCxVQUFNRyxRQUFRLEtBQUtHLE9BQUwsQ0FBYU4sRUFBYixDQUFkO0FBQ0EsVUFBTU8sUUFBUU4sa0JBQVFPLE9BQVIsQ0FBZ0JMLEtBQWhCLENBQWQ7QUFDQUYsd0JBQVFXLE1BQVIsQ0FBZUwsS0FBZixFQUFzQixDQUF0QjtBQUNBLGFBQU9OLGlCQUFQO0FBQ0Q7Ozs7O2tCQUdZRixLIiwiZmlsZSI6InBhcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgcGFydHlEYiBmcm9tICcuLi9kYi9wYXJ0eWRiJztcblxuY2xhc3MgUGFydHl7XG4gICAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFBhcnR5IG9iamVjdFxuICAgKi9cbiAgZmluZE9uZShpZCkge1xuICAgIHJldHVybiBwYXJ0eURiLmZpbmQocGFydHkgPT4gcGFydHkuaWQgPT09IE51bWJlcihpZCkpO1xuICB9XG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBcbiAgICovXG4gIHVwZGF0ZShpZCwgZGF0YSkge1xuICAgIGNvbnN0IHBhcnR5ID0gdGhpcy5maW5kT25lKGlkKTtcbiAgICBjb25zdCBpbmRleCA9IHBhcnR5RGIuaW5kZXhPZihwYXJ0eSk7XG4gICAgdGhpcy5wYXJ0eURiW2luZGV4XS5uYW1lID0gZGF0YVsnbmFtZSddIHx8IHBhcnR5Lm5hbWU7XG4gICAgdGhpcy5wYXJ0eURiW2luZGV4XS5ocWFkZHJlc3MgPSBkYXRhWydocWFkZHJlc3MnXSB8fCBwYXJ0eS5ocWFkZHJlc3M7XG4gICAgdGhpcy5wYXJ0eURiW2luZGV4XS5sb2dvVVJMID0gZGF0YVsnbG9nb1VSTCddIHx8IHBhcnR5LmxvZ29VUkw7XG4gICAgcmV0dXJuIHRoaXMucGFydHlEYltpbmRleF07XG4gIH1cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3V1aWR9IGlkIFxuICAgKi9cbiAgZGVsZXRlKGlkKSB7XG4gICAgY29uc3QgcGFydHkgPSB0aGlzLmZpbmRPbmUoaWQpO1xuICAgIGNvbnN0IGluZGV4ID0gcGFydHlEYi5pbmRleE9mKHBhcnR5KTtcbiAgICBwYXJ0eURiLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHBhcnR5RGI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFydHk7Il19