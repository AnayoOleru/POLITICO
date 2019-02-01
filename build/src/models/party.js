'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Party = function () {
  function Party() {
    _classCallCheck(this, Party);
  }

  _createClass(Party, [{
    key: 'findOne',

    /**
    * 
    * @param {uuid} id
    * @returns {object} reflection object
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvcGFydHkuanMiXSwibmFtZXMiOlsiUGFydHkiLCJpZCIsInBhcnR5RGIiLCJmaW5kIiwicGFydHkiLCJOdW1iZXIiLCJkYXRhIiwiZmluZE9uZSIsImluZGV4IiwiaW5kZXhPZiIsIm5hbWUiLCJocWFkZHJlc3MiLCJsb2dvVVJMIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLEs7Ozs7Ozs7O0FBQ0Y7Ozs7OzRCQUtNQyxFLEVBQUk7QUFDVixhQUFPQyxrQkFBUUMsSUFBUixDQUFhO0FBQUEsZUFBU0MsTUFBTUgsRUFBTixLQUFhSSxPQUFPSixFQUFQLENBQXRCO0FBQUEsT0FBYixDQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozs7MkJBS09BLEUsRUFBSUssSSxFQUFNO0FBQ2YsVUFBTUYsUUFBUSxLQUFLRyxPQUFMLENBQWFOLEVBQWIsQ0FBZDtBQUNBLFVBQU1PLFFBQVFOLGtCQUFRTyxPQUFSLENBQWdCTCxLQUFoQixDQUFkO0FBQ0EsV0FBS0YsT0FBTCxDQUFhTSxLQUFiLEVBQW9CRSxJQUFwQixHQUEyQkosS0FBSyxNQUFMLEtBQWdCRixNQUFNTSxJQUFqRDtBQUNBLFdBQUtSLE9BQUwsQ0FBYU0sS0FBYixFQUFvQkcsU0FBcEIsR0FBZ0NMLEtBQUssV0FBTCxLQUFxQkYsTUFBTU8sU0FBM0Q7QUFDQSxXQUFLVCxPQUFMLENBQWFNLEtBQWIsRUFBb0JJLE9BQXBCLEdBQThCTixLQUFLLFNBQUwsS0FBbUJGLE1BQU1RLE9BQXZEO0FBQ0EsYUFBTyxLQUFLVixPQUFMLENBQWFNLEtBQWIsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7NEJBSU9QLEUsRUFBSTtBQUNULFVBQU1HLFFBQVEsS0FBS0csT0FBTCxDQUFhTixFQUFiLENBQWQ7QUFDQSxVQUFNTyxRQUFRTixrQkFBUU8sT0FBUixDQUFnQkwsS0FBaEIsQ0FBZDtBQUNBRix3QkFBUVcsTUFBUixDQUFlTCxLQUFmLEVBQXNCLENBQXRCO0FBQ0EsYUFBT04saUJBQVA7QUFDRDs7Ozs7O2tCQUdZRixLIiwiZmlsZSI6InBhcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcbmltcG9ydCBwYXJ0eURiIGZyb20gJy4uL2RiL3BhcnR5ZGInO1xyXG5cclxuY2xhc3MgUGFydHl7XHJcbiAgICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3V1aWR9IGlkXHJcbiAgICogQHJldHVybnMge29iamVjdH0gcmVmbGVjdGlvbiBvYmplY3RcclxuICAgKi9cclxuICBmaW5kT25lKGlkKSB7XHJcbiAgICByZXR1cm4gcGFydHlEYi5maW5kKHBhcnR5ID0+IHBhcnR5LmlkID09PSBOdW1iZXIoaWQpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFxyXG4gICAqL1xyXG4gIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgY29uc3QgcGFydHkgPSB0aGlzLmZpbmRPbmUoaWQpO1xyXG4gICAgY29uc3QgaW5kZXggPSBwYXJ0eURiLmluZGV4T2YocGFydHkpO1xyXG4gICAgdGhpcy5wYXJ0eURiW2luZGV4XS5uYW1lID0gZGF0YVsnbmFtZSddIHx8IHBhcnR5Lm5hbWU7XHJcbiAgICB0aGlzLnBhcnR5RGJbaW5kZXhdLmhxYWRkcmVzcyA9IGRhdGFbJ2hxYWRkcmVzcyddIHx8IHBhcnR5LmhxYWRkcmVzcztcclxuICAgIHRoaXMucGFydHlEYltpbmRleF0ubG9nb1VSTCA9IGRhdGFbJ2xvZ29VUkwnXSB8fCBwYXJ0eS5sb2dvVVJMO1xyXG4gICAgcmV0dXJuIHRoaXMucGFydHlEYltpbmRleF07XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7dXVpZH0gaWQgXHJcbiAgICovXHJcbiAgZGVsZXRlKGlkKSB7XHJcbiAgICBjb25zdCBwYXJ0eSA9IHRoaXMuZmluZE9uZShpZCk7XHJcbiAgICBjb25zdCBpbmRleCA9IHBhcnR5RGIuaW5kZXhPZihwYXJ0eSk7XHJcbiAgICBwYXJ0eURiLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gcGFydHlEYjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnR5OyJdfQ==