/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

THREE.HexagonGeometry = function ( width, height, widthSegments, heightSegments ) {
    console.info('HexagonGeometry');
	THREE.Geometry.call( this );

	this.width = width;
	this.height = height;

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;

	var ix, iz;
	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = this.widthSegments;
	var gridZ = this.heightSegments;

	var gridX1 = gridX + 1;
	var gridZ1 = gridZ + 1;

	var segment_width = this.width / gridX;
	var segment_height = this.height / gridZ;

	var normal = new THREE.Vector3( 0, 0, 1 );

	for ( iz = 0; iz < gridZ1; iz ++ ) {

		for ( ix = 0; ix < gridX1; ix ++ ) {

			var x = ix * segment_width - width_half;
			var y = iz * segment_height - height_half;
            //console.info( ix);
            //console.info( ix * segment_width);
			this.vertices.push( new THREE.Vector3( x, - y, 0 ) );

		}

	}

	for ( iz = 0; iz < gridZ; iz ++ ) {
        //if(iz %2 ==0){
    		for ( ix = 0; ix < gridX; ix ++ ) {
                if(ix %2 ==0){
        			var a = ix + gridX1 * iz;
        			var b = ix + gridX1 * ( iz + 1 ) + 1;
        			var c = ( ix + 1 ) + gridX1 * ( iz + 1 );
        			var d = ( ix + 1 ) + gridX1 * iz + 1;
                    //console.info( a, b, c, d );
        			var face = new THREE.Face4( a, b, c, d ,[ a, b, c, d ]);
        			//face.normal.copy( normal );
        			//face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );
        
        			this.faces.push( face );
        			// this.faceVertexUvs[ 0 ].push( [
        				// new THREE.UV( ix / gridX, 1 - iz / gridZ ),
        				// new THREE.UV( ix / gridX, 1 - ( iz + 1 ) / gridZ ),
        				// new THREE.UV( ( ix + 1 ) / gridX, 1 - ( iz + 1 ) / gridZ ),
        				// new THREE.UV( ( ix + 1 ) / gridX, 1 - iz / gridZ )
        			// ] );
                }
    		}
        //}
	}

	this.computeCentroids();

};

THREE.HexagonGeometry.prototype = Object.create( THREE.Geometry.prototype );
