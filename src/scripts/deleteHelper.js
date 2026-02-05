
import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';

import alert from 'components/alert';
import confirm from 'components/confirm/confirm';
import { appRouter } from 'components/router/appRouter';
import { translate } from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';

function alertText(options) {
    return alert(options);
}

function getDeletionConfirmContent(item) {
    if (item.Type === BaseItemKind.Series) {
        const totalEpisodes = item.RecursiveItemCount;
        return {
            title: translate('HeaderDeleteSeries'),
            text: translate('ConfirmDeleteSeries', totalEpisodes),
            confirmText: translate('DeleteEntireSeries', totalEpisodes),
            primary: 'delete'
        };
    }

    if (item.Type === BaseItemKind.BoxSet) {
        return {
            title: translate('HeaderDeleteCollection'),
            text: translate('ConfirmDeleteCollection'),
            confirmText: translate('Delete'),
            primary: 'delete'
        };
    }

    if (item.Type === BaseItemKind.Playlist) {
        return {
            title: translate('HeaderDeletePlaylist'),
            text: translate('ConfirmDeletePlaylist'),
            confirmText: translate('Delete'),
            primary: 'delete'
        };
    }

    return {
        title: translate('HeaderDeleteItem'),
        text: translate('ConfirmDeleteItem'),
        confirmText: translate('Delete'),
        primary: 'delete'
    };
}

export function deleteItem(options) {
    const item = options.item;
    const parentId = item.SeasonId || item.SeriesId || item.ParentId;

    const apiClient = ServerConnections.getApiClient(item.ServerId);

    return confirm(getDeletionConfirmContent(item)).then(function () {
        return apiClient.deleteItem(item.Id).then(function () {
            if (options.navigate) {
                if (parentId) {
                    appRouter.showItem(parentId, item.ServerId);
                } else {
                    appRouter.goHome();
                }
            }
        }, function (err) {
            const result = function () {
                return Promise.reject(err);
            };

            return alertText(translate('ErrorDeletingItem')).then(result, result);
        });
    });
}

export function deleteLyrics (item) {
    return confirm({
        title: translate('HeaderDeleteLyrics'),
        text: translate('ConfirmDeleteLyrics'),
        confirmText: translate('Delete'),
        primary: 'delete'
    }).then(() => {
        const apiClient = ServerConnections.getApiClient(item.ServerId);
        return apiClient.ajax({
            url: apiClient.getUrl('Audio/' + item.Id + '/Lyrics'),
            type: 'DELETE'
        }).catch((err) => {
            const result = function () {
                return Promise.reject(err);
            };

            return alertText(translate('ErrorDeletingLyrics')).then(result, result);
        });
    });
}

export default {
    deleteItem,
    deleteLyrics
};
