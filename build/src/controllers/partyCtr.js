'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _partydb = require('../db/partydb');

var _partydb2 = _interopRequireDefault(_partydb);

var _party = require('../models/party');

var _party2 = _interopRequireDefault(_party);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var partyModel = new _party2.default();

var Party = function () {
  function Party() {
    _classCallCheck(this, Party);
  }

  _createClass(Party, null, [{
    key: 'createParty',

    /**
     * 
     * @param {Values} req - request values into keys 
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */
    value: function createParty(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          hqaddress = _req$body.hqaddress,
          logoURL = _req$body.logoURL;

      _partydb2.default.push({
        id: _uuid2.default.v4(),
        name: name,
        hqaddress: hqaddress,
        logoURL: logoURL
      });
      return res.status(201).json({
        "status": 201,
        "data": _partydb2.default
      });
    }
    /**
     * 
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns specific party
     */

  }, {
    key: 'getPartyById',
    value: function getPartyById(req, res) {
      var partyId = req.params.partyId;

      var partyObject = void 0;
      _partydb2.default.forEach(function (party) {

        if (party.id === Number(partyId)) {
          partyObject = party;
        }
      });
      return res.status(200).json({
        "status": 200,
        "data": partyObject
      });
    }
    /**
     * 
     * @param {uuid} id
     * @param {Object} res - request object
     * @returns {array} - returns all key value pairs as object in array
     */

  }, {
    key: 'getParties',
    value: function getParties(req, res) {
      return res.status(200).json({
        "status": 200,
        "data": _partydb2.default
      });
    }
    /**
       * 
       * @param {object} req 
       * @param {object} res 
       * @returns {object} updated party
       */

  }, {
    key: 'update',
    value: function update(req, res) {
      var partyObject = void 0;

      var party = partyModel.findOne(req.params.id);
      console.log(party);
      if (!party) {
        return res.status(404).send({
          "status": 404,
          "error": "party not found"
        });
      }
      party.name = req.body.name;
      // const updatedParty = PartyModel.update(req.params.id, req.body)
      return res.status(200).send(party);
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return code 204 
     */

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var party = partyModel.findOne(req.params.id);
      if (!party) {
        return res.status(404).send({
          "status": 404,
          "error": "party not found"
        });
      }
      var ref = partyModel.delete(req.params.id);
      return res.status(200).send({
        "status": 200,
        "message": "Party had been deleted",
        "data": party
      });
    }
  }]);

  return Party;
}();

exports.default = Party;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9wYXJ0eUN0ci5qcyJdLCJuYW1lcyI6WyJwYXJ0eU1vZGVsIiwiUGFydHlNb2RlbCIsIlBhcnR5IiwicmVxIiwicmVzIiwiYm9keSIsIm5hbWUiLCJocWFkZHJlc3MiLCJsb2dvVVJMIiwicGFydHlEYiIsInB1c2giLCJpZCIsInV1aWQiLCJ2NCIsInN0YXR1cyIsImpzb24iLCJwYXJ0eUlkIiwicGFyYW1zIiwicGFydHlPYmplY3QiLCJmb3JFYWNoIiwicGFydHkiLCJOdW1iZXIiLCJmaW5kT25lIiwiY29uc29sZSIsImxvZyIsInNlbmQiLCJyZWYiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGFBQWEsSUFBSUMsZUFBSixFQUFuQjs7SUFFTUMsSzs7Ozs7Ozs7QUFDSjs7Ozs7O2dDQU1tQkMsRyxFQUFLQyxHLEVBQUs7QUFBQSxzQkFLdkJELElBQUlFLElBTG1CO0FBQUEsVUFFekJDLElBRnlCLGFBRXpCQSxJQUZ5QjtBQUFBLFVBR3pCQyxTQUh5QixhQUd6QkEsU0FIeUI7QUFBQSxVQUl6QkMsT0FKeUIsYUFJekJBLE9BSnlCOztBQU0zQkMsd0JBQVFDLElBQVIsQ0FBYTtBQUNYQyxZQUFJQyxlQUFLQyxFQUFMLEVBRE87QUFFWFAsa0JBRlc7QUFHWEMsNEJBSFc7QUFJWEM7QUFKVyxPQUFiO0FBTUEsYUFBT0osSUFBSVUsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQzFCLGtCQUFVLEdBRGdCO0FBRTFCLGdCQUFRTjtBQUZrQixPQUFyQixDQUFQO0FBSUQ7QUFDRDs7Ozs7Ozs7O2lDQU1vQk4sRyxFQUFLQyxHLEVBQUs7QUFBQSxVQUNwQlksT0FEb0IsR0FDUmIsSUFBSWMsTUFESSxDQUNwQkQsT0FEb0I7O0FBRTVCLFVBQUlFLG9CQUFKO0FBQ0FULHdCQUFRVSxPQUFSLENBQWdCLFVBQUNDLEtBQUQsRUFBVzs7QUFFekIsWUFBR0EsTUFBTVQsRUFBTixLQUFhVSxPQUFPTCxPQUFQLENBQWhCLEVBQWlDO0FBQy9CRSx3QkFBY0UsS0FBZDtBQUNEO0FBQ0YsT0FMRDtBQU1BLGFBQU9oQixJQUFJVSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsa0JBQVUsR0FEZ0I7QUFFMUIsZ0JBQVFHO0FBRmtCLE9BQXJCLENBQVA7QUFJRDtBQUNEOzs7Ozs7Ozs7K0JBTWtCZixHLEVBQUtDLEcsRUFBTTtBQUMzQixhQUFPQSxJQUFJVSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDMUIsa0JBQVUsR0FEZ0I7QUFFMUIsZ0JBQVFOO0FBRmtCLE9BQXJCLENBQVA7QUFJRDtBQUNIOzs7Ozs7Ozs7MkJBTWdCTixHLEVBQUtDLEcsRUFBSztBQUN0QixVQUFJYyxvQkFBSjs7QUFFQSxVQUFNRSxRQUFRcEIsV0FBV3NCLE9BQVgsQ0FBbUJuQixJQUFJYyxNQUFKLENBQVdOLEVBQTlCLENBQWQ7QUFDQVksY0FBUUMsR0FBUixDQUFZSixLQUFaO0FBQ0EsVUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVixlQUFPaEIsSUFBSVUsTUFBSixDQUFXLEdBQVgsRUFBZ0JXLElBQWhCLENBQXFCO0FBQzFCLG9CQUFVLEdBRGdCO0FBRTFCLG1CQUFTO0FBRmlCLFNBQXJCLENBQVA7QUFJRDtBQUNETCxZQUFNZCxJQUFOLEdBQWFILElBQUlFLElBQUosQ0FBU0MsSUFBdEI7QUFDQTtBQUNBLGFBQU9GLElBQUlVLE1BQUosQ0FBVyxHQUFYLEVBQWdCVyxJQUFoQixDQUFxQkwsS0FBckIsQ0FBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs0QkFNY2pCLEcsRUFBS0MsRyxFQUFLO0FBQ3RCLFVBQU1nQixRQUFRcEIsV0FBV3NCLE9BQVgsQ0FBbUJuQixJQUFJYyxNQUFKLENBQVdOLEVBQTlCLENBQWQ7QUFDQSxVQUFJLENBQUNTLEtBQUwsRUFBWTtBQUNWLGVBQU9oQixJQUFJVSxNQUFKLENBQVcsR0FBWCxFQUFnQlcsSUFBaEIsQ0FBcUI7QUFDMUIsb0JBQVUsR0FEZ0I7QUFFMUIsbUJBQVM7QUFGaUIsU0FBckIsQ0FBUDtBQUlEO0FBQ0QsVUFBTUMsTUFBTTFCLFdBQVcyQixNQUFYLENBQWtCeEIsSUFBSWMsTUFBSixDQUFXTixFQUE3QixDQUFaO0FBQ0EsYUFBT1AsSUFBSVUsTUFBSixDQUFXLEdBQVgsRUFBZ0JXLElBQWhCLENBQXFCO0FBQzFCLGtCQUFVLEdBRGdCO0FBRTFCLG1CQUFXLHdCQUZlO0FBRzFCLGdCQUFRTDtBQUhrQixPQUFyQixDQUFQO0FBS0Q7Ozs7OztrQkFFWWxCLEsiLCJmaWxlIjoicGFydHlDdHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcbmltcG9ydCBwYXJ0eURiIGZyb20gJy4uL2RiL3BhcnR5ZGInO1xyXG5pbXBvcnQgUGFydHlNb2RlbCBmcm9tICcuLi9tb2RlbHMvcGFydHknO1xyXG5cclxuY29uc3QgcGFydHlNb2RlbCA9IG5ldyBQYXJ0eU1vZGVsKClcclxuXHJcbmNsYXNzIFBhcnR5e1xyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmFsdWVzfSByZXEgLSByZXF1ZXN0IHZhbHVlcyBpbnRvIGtleXMgXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcyAtIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYWxsIGtleSB2YWx1ZSBwYWlycyBhcyBvYmplY3QgaW4gYXJyYXlcclxuICAgKi9cclxuICBzdGF0aWMgY3JlYXRlUGFydHkocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgbmFtZSxcclxuICAgICAgaHFhZGRyZXNzLFxyXG4gICAgICBsb2dvVVJMXHJcbiAgICB9ID0gcmVxLmJvZHk7XHJcbiAgICBwYXJ0eURiLnB1c2goe1xyXG4gICAgICBpZDogdXVpZC52NCgpLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBocWFkZHJlc3MsXHJcbiAgICAgIGxvZ29VUkxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAgICAgXCJzdGF0dXNcIjogMjAxLFxyXG4gICAgICBcImRhdGFcIjogcGFydHlEYlxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7dXVpZH0gaWRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzIC0gcmVxdWVzdCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBzcGVjaWZpYyBwYXJ0eVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRQYXJ0eUJ5SWQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgcGFydHlJZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGxldCBwYXJ0eU9iamVjdDtcclxuICAgIHBhcnR5RGIuZm9yRWFjaCgocGFydHkpID0+IHtcclxuICAgICAgXHJcbiAgICAgIGlmKHBhcnR5LmlkID09PSBOdW1iZXIocGFydHlJZCkpIHtcclxuICAgICAgICBwYXJ0eU9iamVjdCA9IHBhcnR5O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgIFwic3RhdHVzXCI6IDIwMCxcclxuICAgICAgXCJkYXRhXCI6IHBhcnR5T2JqZWN0XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHt1dWlkfSBpZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSByZXF1ZXN0IG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFsbCBrZXkgdmFsdWUgcGFpcnMgYXMgb2JqZWN0IGluIGFycmF5XHJcbiAgICovXHJcbiAgc3RhdGljIGdldFBhcnRpZXMocmVxLCByZXMpICB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgIFwiZGF0YVwiOiBwYXJ0eURiXHJcbiAgICB9KTtcclxuICB9XHJcbi8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXEgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlcyBcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB1cGRhdGVkIHBhcnR5XHJcbiAgICovXHJcbiAgc3RhdGljIHVwZGF0ZShyZXEsIHJlcykge1xyXG4gICAgbGV0IHBhcnR5T2JqZWN0O1xyXG5cclxuICAgIGNvbnN0IHBhcnR5ID0gcGFydHlNb2RlbC5maW5kT25lKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgY29uc29sZS5sb2cocGFydHkpO1xyXG4gICAgaWYgKCFwYXJ0eSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xyXG4gICAgICAgIFwic3RhdHVzXCI6IDQwNCxcclxuICAgICAgICBcImVycm9yXCI6IFwicGFydHkgbm90IGZvdW5kXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwYXJ0eS5uYW1lID0gcmVxLmJvZHkubmFtZVxyXG4gICAgLy8gY29uc3QgdXBkYXRlZFBhcnR5ID0gUGFydHlNb2RlbC51cGRhdGUocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkpXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQocGFydHkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVxIFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXMgXHJcbiAgICogQHJldHVybnMge3ZvaWR9IHJldHVybiBjb2RlIDIwNCBcclxuICAgKi9cclxuICBzdGF0aWMgZGVsZXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCBwYXJ0eSA9IHBhcnR5TW9kZWwuZmluZE9uZShyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICghcGFydHkpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHtcclxuICAgICAgICBcInN0YXR1c1wiOiA0MDQsXHJcbiAgICAgICAgXCJlcnJvclwiOiBcInBhcnR5IG5vdCBmb3VuZFwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVmID0gcGFydHlNb2RlbC5kZWxldGUocmVxLnBhcmFtcy5pZCk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xyXG4gICAgICBcInN0YXR1c1wiOiAyMDAsXHJcbiAgICAgIFwibWVzc2FnZVwiOiBcIlBhcnR5IGhhZCBiZWVuIGRlbGV0ZWRcIixcclxuICAgICAgXCJkYXRhXCI6IHBhcnR5XHJcbiAgICB9KTtcclxuICB9XHJcbn0gXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnR5OyJdfQ==