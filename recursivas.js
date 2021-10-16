// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }
// let i = 0;
// while (i < 10) {
//     console.log(i);
//     i++;
// }

function contador(i) {
    console.log(i);
    if (i === 0) return;

    contador(i - 1);
}

contador(10);
