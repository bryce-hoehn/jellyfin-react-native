import { translate } from 'lib/globalize';

const getCollectionTypeOptions = () => {
    return [{
        name: '',
        value: ''
    }, {
        name: translate('Movies'),
        value: 'movies'
    }, {
        name: translate('TabMusic'),
        value: 'music'
    }, {
        name: translate('Shows'),
        value: 'tvshows'
    }, {
        name: translate('Books'),
        value: 'books'
    }, {
        name: translate('HomeVideosPhotos'),
        value: 'homevideos'
    }, {
        name: translate('MusicVideos'),
        value: 'musicvideos'
    }, {
        name: translate('MixedMoviesShows'),
        value: 'mixed'
    }];
};

export default getCollectionTypeOptions;
