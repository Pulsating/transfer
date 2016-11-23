/**
 * @Author:   Live
 * @Email:       ivill@live.com
 * @DateTime:   2016-10-27 10:52
 * @Description: 穿梭框 v1.0.0
 * @Require: [jQuery, Bootstrap, Aavalon]
 */

define(function() {
    var vm = null;

    function _watch() {
        vm.$watch('keyword', function(val) {
            _search( val, vm.$model.matchedList );
        });
    }
    
    function _moveUp( index ) {
        if ( index === 0 ) {
            return false;
        }

        _changeArrayPosition( index, index - 1 );
    }

    function _moveDown( index ) {
        if ( index === vm.$model.orderedList.length - 1 ) {
            return false;
        }

        _changeArrayPosition( index, index + 1 );
    }

    function _changeArrayPosition(index, toIndex) {
        var temp = null,
            arr = vm.$model.orderedList;

        temp = arr[ toIndex ];
        arr[ toIndex ] = arr[ index ];
        arr[ index ] = temp;

        vm.orderedList = arr;
    }

    function _getSelectedList( ulSelector ) {
        var result = [],
            $all = $( ulSelector ).find( 'input:checkbox' );

        $all.map(function(index, ele) {
            if ( $(ele).prop('checked') ) {
                result.push( ele.value );
            }
        });

        return result;
    }

    function _filterArrary( originalArray, selectedArray, bool ) {
        var i,
            arr = [],
            len = selectedArray.length;

        arr = originalArray.filter(function( item, index ) {
           for (var i = 0; i < selectedArray.length; i++) {
               if (item[ vm.conf.Id ] == selectedArray[i]) {
                 return !bool;
               }
           }

           return bool;
        });

        return arr;
    }


    function _getMatchedList( orderedList, allList) {
        var i,
            result = [],
            len = orderedList.length;

        result = allList.filter(function(item) {
            for (i = 0; i < len; i++) {
                if (item[ vm.conf.Id ] == orderedList[i][ vm.conf.Id ]) {
                    return false;
                }
            }

            return true;
        });

        return result;
    }

    function _search( keyword, matchedList ) {
        keyword = $.trim( keyword );

        if (keyword !== '') {
            var result = matchedList.filter(function (item) {
                return ( (item[ vm.conf.Id ] + '').indexOf(keyword) > -1 || (item[ vm.conf.Name ] + '').indexOf(keyword) > -1 );
            });

            vm.searchedList = result;
        } else {
            vm.searchedList = matchedList;
        }
    }

    function createVm( options ) {
        vm = avalon.define({
            $id: options.vmId,
            keyword: '',
            conf: {
                Id: 'Id',
                Name: 'Name'
            },
            allList: [], // 总列表
            matchedList: [], // 总列表 和 排序列表 的交集列表
            orderedList: [], // 左侧排序列表（目的列表）
            searchedList: [], // 搜索出来的列表
            transfer: function( ulSelector, sender, receiver ) {
                var originalArray = vm.$model[ sender ],
                    receiverArray = vm.$model[ receiver ],
                    selectedArray = _getSelectedList( ulSelector );

                vm[ sender ] = _filterArrary( originalArray, selectedArray, true );
                vm[ receiver ] = receiverArray.concat( _filterArrary(originalArray, selectedArray, false ) );

                _search( vm.$model.keyword, vm.$model.matchedList );
            },
            moveUp: function( index ) {
                _moveUp( index );
            },
            moveDown: function( index ) {
                _moveDown( index );
            }
        });

        _watch();
        avalon.scan();

        return vm;
    }

    function init( options ) {
        var list = [];

        $.extend( vm.conf, options.conf );
        vm.allList =  options.allList;
        vm.orderedList =  options.orderedList;

        list = _getMatchedList( options.orderedList, options.allList );
        vm.matchedList =  list;
        vm.searchedList = list;
    }

    function reset() {
        vm.keyword = '';
        vm.allList = [];
        vm.matchedList = [];
        vm.orderedList = [];
        vm.searchedList = [];
    }

    function getResult() {
        return vm.$model.orderedList;
    }

    return {
        init: init,
        reset: reset,
        createVm: createVm,
        getResult: getResult
    };
});