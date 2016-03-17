/* -*- Mode: JS2; indent-tabs-mode: nil; js2-basic-offset: 4 -*- */
/* vim: set et ts=4 sw=4: */
/*
 * GNOME Maps is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * GNOME Maps is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with GNOME Maps; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Hashem Nasarat <hashem@riseup.net>
 */

const Lang = imports.lang;

const GeoJSONSource = imports.geoJSONSource;
const ShapeLayer = imports.shapeLayer;
const Togeojson = imports.togeojson.togeojson;
const Domparser = imports.xmldom.domparser;

const GpxShapeLayer = new Lang.Class({
    Name: 'GpxShapeLayer',
    Extends: ShapeLayer.ShapeLayer,

    _init: function(params) {
        this.parent(params);

        this._mapSource = new GeoJSONSource.GeoJSONSource({
            mapView: this._mapView,
            markerLayer: this._markerLayer
        });
    },

    _parseContent: function() {
        let s = this._fileContents.toString();
        let parser = new Domparser.DOMParser();
        let json = Togeojson.toGeoJSON.gpx(parser.parseFromString(s));
        this._mapSource.parse(json);
    }
});

GpxShapeLayer.mimeTypes = ['application/gpx+xml' ];
GpxShapeLayer.displayName = 'GPX';