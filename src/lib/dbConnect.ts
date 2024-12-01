import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected ?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log('Already connected to the database');
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '', {});

        connection.isConnected = db.connections[0].readyState;

        console.log(`Database connected successfully ${connection}`)
    } catch (error) {
        console.error('Database connection failed: ', error);
        process.exit();
    }
}

export default dbConnect;