const div = document.createElement('div');

div.innerHTML = `
    <h1>hello world!</h1>
`
var containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px'
}
Object.assign(div.style, containerStyle);

export const exampleApp = () => {
    return div
}