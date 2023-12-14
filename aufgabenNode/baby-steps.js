let sum = 0

for (let i = 2; i < process.argv.length ; i++) {
    sum += process.argv[i] / 1
}

console.log(sum)
