import net from 'node:net'

console.log('Starting postgres...')

function checkPostgres() {
  const socket = net.connect(5432, 'postgres', () => {
    console.log('✔ Postgres is running!\n')
    socket.end()
  })

  socket.on('error', () => {
    checkPostgres()
  })
}

checkPostgres()
