import { translate } from 'lib/globalize';
import Dashboard from 'utils/dashboard';

function processForgotPasswordResult(result) {
    if (result.Success) {
        let msg = translate('MessagePasswordResetForUsers');
        msg += '<br/>';
        msg += '<br/>';
        msg += result.UsersReset.join('<br/>');
        Dashboard.alert({
            message: msg,
            title: translate('HeaderPasswordReset'),
            callback: function () {
                window.location.href = '';
            }
        });
        return;
    }

    Dashboard.alert({
        message: translate('MessageInvalidForgotPasswordPin'),
        title: translate('HeaderPasswordReset')
    });
}

export default function (view) {
    function onSubmit(e) {
        ApiClient.ajax({
            type: 'POST',
            url: ApiClient.getUrl('Users/ForgotPassword/Pin'),
            dataType: 'json',
            data: JSON.stringify({
                Pin: view.querySelector('#txtPin').value
            }),
            contentType: 'application/json'
        }).then(processForgotPasswordResult);
        e.preventDefault();
        return false;
    }

    view.querySelector('form').addEventListener('submit', onSubmit);

    view.querySelector('#txtPin').focus();
}

