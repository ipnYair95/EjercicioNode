import {App} from './app';

async function main(){
    const app = new App(3003);
    await app.listen();
}

main();