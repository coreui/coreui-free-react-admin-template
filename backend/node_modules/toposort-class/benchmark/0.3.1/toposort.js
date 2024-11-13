!function() {
    "use strict";

    /**
     * Topological sort class.
     * Original by Marcel Klehr, contributed by Gustavo Henke.
     *
     * @class
     * @since   0.1.0
     * @see     https://github.com/marcelklehr/toposort
     * @author  Marcel Klehr <mklehr@gmx.net>
     *
     * @see     https://github.com/gustavohenke/toposort
     * @author  Gustavo Henke <gustavo@injoin.com.br>
     */
    function Toposort() {
        var self = this;
        var edges = [];

        /**
         * Adds dependency edges.
         *
         * @since   0.1.0
         * @param   {String} item               An dependent name. Must be an string and not empty
         * @param   {String[]|String} [deps]    An dependency or array of dependencies
         * @returns {Toposort}                  The Toposort instance
         */
        self.add = function( item, deps ) {
            if( typeof item !== "string" || !item ) {
                throw new TypeError( "Dependent name must be given as a not empty string" );
            }

            deps = Array.isArray( deps ) ? deps.slice() : [deps];
            if( deps.length ) {
                deps.forEach( function( dep ) {
                    if( typeof dep !== "string" || !dep ) {
                        throw new TypeError(
                            "Dependency name must be given as a not empty string"
                        );
                    }

                    edges.push( [item, dep] );
                } );
            } else {
                edges.push( [item] );
            }

            return self;
        };

        /**
         * Runs the toposorting and return an ordered array of strings
         *
         * @since   0.1.0
         * @returns {String[]}  The list of items topologically sorted.
         */
        self.sort = function() {
            var nodes = [];
            var sorted = [];

            edges.forEach( function( edge ) {
                edge.forEach( function( n ) {
                    if( nodes.indexOf( n ) === -1 ) {
                        nodes.push( n );
                    }
                } );
            } );

            function visit( node, predecessors, i ) {
                var index, predsCopy;
                predecessors = predecessors || [];

                if( predecessors.indexOf( node ) > -1 ) {
                    throw new Error(
                        "Cyclic dependency found. '" + node + "' is dependent of itself.\n" +
                        "Dependency Chain: " + predecessors.join( " -> " ) + " => " + node
                    );
                }

                index = nodes.indexOf( node );
                if( index === -1 ) {
                    return i;
                }

                nodes.splice( index, 1 );
                if( predecessors.length === 0 ) {
                    i--;
                }

                predsCopy = predecessors.slice();
                predsCopy.push( node );

                edges.filter( function( e ) {
                    return e[0] === node;
                } ).forEach( function( e ) {
                    i = visit( e[1], predsCopy, i );
                } );

                sorted.unshift( node );
                return i;
            }

            for( var i = 0; i < nodes.length; i++ ) {
                i = visit( nodes[i], null, i );
            }

            return sorted;
        };

    }

    if( typeof module === "object" && module && typeof module.exports === "object" ) {
        // Expose toposort to CommonJS loaders (aka Node)
        module.exports = exports.Toposort = Toposort;
    } else {
        // Expose toposort to AMD loaders (aka Require.js)
        if( typeof define === "function" && define.amd ) {
            define( function() {
                return Toposort;
            } );
        }

        // Expose toposort as a browser global
        if( typeof window === "object" ) {
            window.Toposort = Toposort;
        }
    }
}();
