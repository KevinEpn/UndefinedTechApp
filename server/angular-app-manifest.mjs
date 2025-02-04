
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/UndefinedTechApp/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/home"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/level1"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/level2"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/level3"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/scoretable"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/activity"
  },
  {
    "renderMode": 2,
    "route": "/UndefinedTechApp/final-form"
  },
  {
    "renderMode": 2,
    "redirectTo": "/UndefinedTechApp",
    "route": "/UndefinedTechApp/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5064, hash: 'e2fe102bc0a3f5642769117ec12c1611958fbe07ab743194ba73616672c6bdee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1095, hash: '5a2ce6b70d7d1d8848f34ca3538bdf8df596c3209dfe87a911dd5de123b83b26', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 34334, hash: 'dcc45d7ae5c26d2d7eca9107f0a97710338438e3dbc9ad6245cf114cde067264', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'index.html': {size: 34319, hash: '7e285cad101c2d2a6ba362e1291472be89d4c5d7b824418f48fb75b6a5e2fb8c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'level2/index.html': {size: 50847, hash: '9b64d56ee900bb201452a488536c74482d3e89f33bdc19afe78adddef1cd5fdc', text: () => import('./assets-chunks/level2_index_html.mjs').then(m => m.default)},
    'level3/index.html': {size: 51226, hash: '30fc0b1fc75449c53f3a5edda28daa7fba12b14dbaca082152a4dc228d7fbbe8', text: () => import('./assets-chunks/level3_index_html.mjs').then(m => m.default)},
    'activity/index.html': {size: 31253, hash: '3a6e11205d97737f7788c7bc75f129d95dbe992a27e2ac7bf241b11aef0c12a1', text: () => import('./assets-chunks/activity_index_html.mjs').then(m => m.default)},
    'final-form/index.html': {size: 33072, hash: 'b292b2e280ab723cea909da3d7a338ed35ad0670d23654597747836b032bca90', text: () => import('./assets-chunks/final-form_index_html.mjs').then(m => m.default)},
    'level1/index.html': {size: 54146, hash: '3bbf569b968219facc38caef3c192eef379c12c6792026cad02edf84fdf18f3f', text: () => import('./assets-chunks/level1_index_html.mjs').then(m => m.default)},
    'scoretable/index.html': {size: 33047, hash: 'cf2dab103ada8e928e862b815be3fe13e3fabff441eb482fa3aed4dcfc9f4f13', text: () => import('./assets-chunks/scoretable_index_html.mjs').then(m => m.default)},
    'styles-RJ6WB4EV.css': {size: 231929, hash: 'KA8bakRmDMI', text: () => import('./assets-chunks/styles-RJ6WB4EV_css.mjs').then(m => m.default)}
  },
};
