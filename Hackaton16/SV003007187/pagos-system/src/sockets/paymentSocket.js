function initializeSocket(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        
        socket.on('join_user', (userId) => {
            socket.join(`user_${userId}`);
        });
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    
    return io;
}

module.exports = initializeSocket;