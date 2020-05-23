
function numberToLetters(_number) {
    // eslint-disable-next-line 
    var _arr_numbers = new Array();
    // eslint-disable-next-line 
    _arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
    // eslint-disable-next-line 
    _arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
   // eslint-disable-next-line 
    _arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
    function number_parser(_num, _desc) {
            var _string = '';
            var _num_hundred = '';
            if (_num.length === 3) {
                    _num_hundred = _num.substr(0, 1);
                    _num = _num.substr(1, 3);
                    _string = _arr_numbers[3][_num_hundred] + ' ';
            }
            if (_num < 20) _string = `${_arr_numbers[1][parseFloat(_num)]} `;
            else {
                    var _first_num = _num.substr(0, 1);
                    var _second_num = _num.substr(1, 2);
                    _string += _arr_numbers[2][_first_num] + ' ' + _arr_numbers[1][_second_num] + ' ';
            } 
            // eslint-disable-next-line              
            switch (_desc){
                    case 0:
                        // eslint-disable-next-line 
                        var _last_num = parseFloat(_num.substr(-1));
                        if (_last_num === 1) _string = `${_string}рубль`;
                        else if (_last_num > 1 && _last_num < 5) _string = `${_string}рубля`;
                        else _string = `${_string}рублей`;
                        break;
                    case 1:
                        // eslint-disable-next-line 
                        var _last_num = parseFloat(_num.substr(-1));
                        if (_last_num === 1) _string += 'тысяча ';
                        else if (_last_num > 1 && _last_num < 5) _string += 'тысячи ';
                        else _string += 'тысяч ';
                        _string = _string.replace('один ', 'одна ');
                        _string = _string.replace('два ', 'две ');
                        break;
                    case 2:
                        // eslint-disable-next-line 
                        var _last_num = parseFloat(_num.substr(-1));
                        if (_last_num === 1) _string += 'миллион ';
                        else if (_last_num > 1 && _last_num < 5) _string += ' миллиона ';
                        else _string += 'миллионов ';
                        break;
                    case 3:
                        // eslint-disable-next-line 
                        var _last_num = parseFloat(_num.substr(-1));
                        if (_last_num === 1) _string += 'миллиард ';
                        else if (_last_num > 1 && _last_num < 5) _string += ' миллиарда ';
                        else _string += 'миллиардов ';
                        break;
            }
            _string = _string.replace('  ', ' ');
            return _string;
    }
    if (!_number || _number === 0) return false;
    if (typeof _number !== 'number') {
        _number = _number.replace(',', '.');
        _number = parseFloat(_number);
        if (isNaN(_number)) return false;
    }
    _number = _number.toFixed(2);
    if(_number.indexOf('.') !== -1) {
        // eslint-disable-next-line 
        var _number_arr = _number.split('.');
        // eslint-disable-next-line 
        var _number = _number_arr[0];
    }
    var _number_length = _number.length;
    var _string = '';
    var _num_parser = '';
    var _count = 0;
    for (var _p = (_number_length - 1); _p >= 0; _p--) {
            var _num_digit = _number.substr(_p, 1);
            _num_parser = _num_digit +  _num_parser;
            if ((_num_parser.length === 3 || _p === 0) && !isNaN(parseFloat(_num_parser))) {
                    _string = number_parser(_num_parser, _count) + _string;
                    _num_parser = '';
                    _count++;
            }
    }
    return ('(' + _string.charAt(0).toUpperCase() + _string.substring(1)).replace(/^(.*?)\s(\S*)$/,'$1) $2');
}

export default numberToLetters;