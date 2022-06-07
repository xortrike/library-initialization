/**
 * Initialization library
 * @class InitializationLibrary
 */
class InitializationLibrary
{
    constructor(spaceBetweenGroups = true, spaceBetweenKeyValue = true, removeCommentFromValue = true)
    {
        this.spaceBetweenGroups = spaceBetweenGroups;
        this.spaceBetweenKeyValue = spaceBetweenKeyValue;
        this.removeCommentFromValue = removeCommentFromValue;

        this.regexpComments = new RegExp('^(;|#).+', 'g');
        this.regexpValueComment = new RegExp('(;|#).*$', 'gm');
        this.regexpTypeof = new RegExp('\\[object (\\w+)\\]');
    }

    /**
     * Converting text data to object
     * @param {String} fileContent Text data
     * @returns {Object}
     */
    getObject(fileContent = '')
    {
        let result = new Object();

        let clearFileContent = this._clearingContent(fileContent, this.removeCommentFromValue);
        let contentRows = clearFileContent.split('\n');

        let groupName = new String();
        for (let i = 0, n = contentRows.length; i < n; ++i) {
            let row = contentRows[i].trim();
            let rowLen = row.length;
            if (row.substring(0, 1) === '[' && row.substring(rowLen-1, rowLen) === ']') {
                groupName = row.substring(1, rowLen-1);
                if (groupName.length) {
                    result[groupName] = new Object();
                }
            } else if (groupName.length && row.indexOf('=') > 0) {
                let keyValue = row.split('=');
                let key = keyValue[0].trim();
                let value = keyValue.slice(1).join('=').trim();
                result[groupName][key] = value;
            }
        }

        return result;
    }

    /**
     * Converting object data to text
     * @param {Object} object Object data
     * @returns {String}
     */
    getFileContent(object = {})
    {
        let result = new Array();

        if (this._typeof(object) === 'Object') {
            for (let name in object) {
                if (this.spaceBetweenGroups && result.length) {
                    result.push('');
                }
                result.push('[' + name + ']');
                if (this._typeof(object) === 'Array') {
                    for (let i = 0, n = object[name].length; i < n; ++i) {
                        result.push(i + (this.spaceBetweenKeyValue ? ' = ' : '=' ) + object[name][i]);
                    }
                } else if (this._typeof(object) === 'Object') {
                    for (let key in object[name]) {
                        result.push(key + (this.spaceBetweenKeyValue ? ' = ' : '=' ) + object[name][key]);
                    }
                }
            }
        }

        return result.join('\n');
    }

    /**
     * Cleaning data from comment content
     * @param {String} value String data
     * @returns {String}
     */
    _clearingContent(value = '', endLine = false)
    {
        let result = value.replace(this.regexpComments, '');

        if (endLine) {
            result = result.replace(this.regexpValueComment, '');
        }

        return result;
    }

    /**
     * Return type name of variable
     * @param {*} variable Any type of variable
     * @returns {String}
     */
    _typeof(variable)
    {
        return Object.prototype.toString.call(variable).match(this.regexpTypeof)[1];
    }
}
