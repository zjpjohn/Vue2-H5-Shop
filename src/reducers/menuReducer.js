import * as AppAction from '../actions/AppAction';
import * as RouterUtil from '../utils/RouterUtil';

const menuCollection = {
    user: {
        title: 'Users',
        icon: 'pt-icon-user',
        basePath: 'appUserManage',
        children: [
            { title: 'User List', path: 'users' }
        ]
    },
    data: {
        title: 'Data',
        basePath: 'data',
        icon: 'pt-icon-timeline-bar-chart',
        children: [
            { title: 'Actives', path: 'actives' },
            { title: 'Registrations', path: 'regists' },
        ]
    },
    graph:{
        title:'Graph',
        basePath:'graph',
        icon:'pt-icon-pie-chart',
        children: [
            { title: 'Bargraph', path: 'Bargraph' },
            { title: 'Piegraph', path: 'Piegraph' },
        ]
    },
    dataAnother:{
        title: 'Data',
        basePath: 'data',
        icon: 'pt-icon-timeline-bar-chart',
        children: [
            { title: 'New', path: 'new' },
            { title: 'Actives', path: 'Cactive' },
        ]
    },
    app: {
        title: 'App',
        basePath: 'appManage',
        icon: 'pt-icon-new-object',
        children: [
            { title: 'Add Version', path: 'versions/add' },
            { divider: true },
            { title: 'Versions', path: 'versions' },
            { title: 'Feedbacks', path: 'feedbacks' },
        ]
    },
    system: {
        title: 'System',
        basePath: 'sysManage',
        icon: 'pt-icon-cog',
        children: [
            { title: 'SysUser', path: 'sysUsers' }
        ]
    },
    chatMusic: {
        title: 'Chat Music',
        basePath: 'chatMusic/musicManage',
        icon: 'pt-icon-music',
        children: [
            { title: 'Add Music', path: 'details/add' },
            { title: 'Add Genre', path: 'genres/add' },
            { divider: true},
            { title: 'Genres', path: 'genres' },
            { title: 'Musics', path: 'details' }
        ]
    }
}

const mainMenus = {
    default: [
        menuCollection.data,
        menuCollection.user,
        menuCollection.app,
        menuCollection.system
    ],
    musicChat: [
        menuCollection.data,
        menuCollection.user,
        menuCollection.chatMusic,
        menuCollection.app,
        menuCollection.system
    ],
    aha: [
        menuCollection.data,
        menuCollection.user,
        menuCollection.app,
        menuCollection.system
    ],
    Cchat: [
        menuCollection.dataAnother,
    ],
    spriteGo: [
        menuCollection.data,
        menuCollection.user,
        menuCollection.app,
        menuCollection.system,
        menuCollection.graph
     ]
}

const projects = {
    default: {
        name: 'default',
        key: 'eyes',
        title: 'In Your Eyes Console',
        favicon: 'static/eyes-icon.png'
    },
    musicChat: {
        name: 'musicChat',
        key: 'music_chat',
        title: 'Music Chat Console',
        favicon: 'static/music-chat.png'
    },
    aha: {
        name: 'aha',
        key: 'aha',
        title: 'Aha Console',
        favicon: 'static/aha-icon.png'
    },
    Cchat: {
        name: 'Cchat',
        key: 'Cchat',
        title: 'Cchat Console',
        favicon: 'static/aha-icon.png'
    },
    spriteGo: {
        name: 'spriteGo',
        key: 'run_sprite',
        title: 'Sprite Go Console',
        favicon: 'static/run-sprite.png'
     }
}

readProjectFromLocalStorage();

const defaultState = {
    project: projects[window._selectProjectName],
    mainMenu: mainMenus[window._selectProjectName],
    collapsMenu: [
        ''
    ]
}

export default function menuReducer(state = defaultState, action) {
    switch (action.type) {
        case AppAction.AT_LOCATION_UPDATE:
            return applyLocationUpdate(state, action.payload);

        default:
            return state;
    }
}
//面包屑导航
function applyLocationUpdate(state, path) {
    const baseCollapsMenu = '';
    let level1 = null;
    let level2 = null;

    //返回当前路径名‘/’之后的字符串 例如：/data/regists 返回 data/regists
    path = RouterUtil.trimStartSlash(path);

    outter:
    for (let item of state.mainMenu) {
            //data
        if (path.indexOf(item.basePath) === 0) {
            //level1=Data
            level1 = item.title;
            //再次获取‘/’之后的字符串 例如：data/regists  返回 regists
            path = RouterUtil.trimStartSlash(path.replace(item.basePath, ''));

            for (let childItem of item.children) {
                //regists
                if (!childItem.divider && RouterUtil.trimStartSlash(childItem.path) === path) {
                    //level2=Registrations
                    level2 = childItem.title;
                    break;
                }
            }

            break outter;
        }
    }

    const collapsMenu = [baseCollapsMenu];
    if (level1 != null) {
        collapsMenu.splice(0,1,level1);
    }
    if (level2 != null) {
        collapsMenu.push(level2);
    }

    return Object.assign({}, state, {
        collapsMenu
    });
}

function readProjectFromLocalStorage() {
    window._selectProjectName = window.localStorage.getItem('selectProjectName') || 'default';
    window._selectProjectKey = projects[window._selectProjectName].key;

    document.title = projects[window._selectProjectName].title;
    document.getElementById('favicon').href = projects[window._selectProjectName].favicon;
}
