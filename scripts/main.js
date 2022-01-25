JFCustomWidget.subscribe("ready", function () {
    function getCheckedValues() {
        let checkedValues = '';
        let itms = document.querySelectorAll('input:checked');

        itms.forEach(itm => {
            checkedValues += itm.value + ',';
        });
        return checkedValues;
    }

    function valueClick() {
        let checkedValues = '';
        let itms = document.querySelectorAll('input:checked');
        itms.forEach(itm => {
            checkedValues += itm.value + ',';
        });
        JFCustomWidget.sendData({ valid: true, value: checkedValues });
    }

    /* Init Jotform */
    let text = '';
    let jotformSettings = JFCustomWidget.getWidgetSettings();

    /* Get Images */
    let images = '' + jotformSettings.questionImages;
    images = images.split('\n');

    /* Get Images Labels */
    let items = '' + jotformSettings.questionValues;
    items = items.split('; ');

    /* Get Border Color */
    document.body.style.setProperty('--border-color', jotformSettings.borderColor);

    /* Get Images */
    for (let i = 0; i < items.length; i++) {
        let img;
        if ((images.length > 0) && (images[i] != undefined) && (images[i] != 'undefined')) {
            img = images[i];
        }
        else {
            img = '/asset/default.png';
        }
        text += ' \
                           <div class="images"> \
                           <div> \
                                <input id="'+ items[i] + '" class="items" type="' + jotformSettings.inputType + '" value="' + items[i] + '" name="' + jotformSettings.qid + '" > \
                                <label id="item' + i + '" for="' + items[i] + '"> \
                                    <img class="image-file" height="100%" width="100%" src="' + img + '" alt="Picture from ' + items[i] + '"> \
                                </label> \
                           </div>\
                           <div class="images-info"> \
                               <span>' + items[i] + '</span> \
                           </div>  \
                           </div>';
    }

    document.getElementById('items').innerHTML = text;

    for (let i = 0; i < items.length; i++) {
        document.getElementById(items[i]).onchange = valueClick;
    }
    // document.onclick = () => {console.log('test')};
    JFCustomWidget.subscribe("submit", function () {
        let msg = {
            valid: true,
            value: getCheckedValues()
        }
        JFCustomWidget.sendSubmit(msg);
    });
});