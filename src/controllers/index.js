import prisma from "../utils/prisma.js";
export const createNoteController = async (req, res) => {
    try {
        // request
        const { title, description } = req.body;

        // validation
        // title
        if(title.length === 0){
            return res.status(400).json({
                message: "Input title tidak boleh kosong!",
            });
        }

        if(title.length < 2){
            return res.status(400).json({
                message: "Title tidak boleh kurang dari 2 karakter!",
            })
        }

const noteExists = await prisma.notes.findFirst({
where: {
    title: title,
},
});

if (noteExists) {
    return res.status(400).json({
        success: false,
        error: 400,
        message: "Note ini sudah ada di database!",
    });
}

        // description
        if(description.length === 0){
        return res.status(400).json({
            message: "Input description tidak boleh kosong!",
        })
        }

    // send to database
    await prisma.notes.create({
        data: {
            title : title,
            description : description,
        },
    });

res.status(201).json({
    success: true,
    code: 201,
    message: "Note berhasil dibuat!",
});

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: error.messege,
        });
    }
};

export const getAllNoteController = async (req, res) => {
    try {
        // validation
        const notes = await prisma.notes.findMany();
        if(notes.length === 0){
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Tidak ada note"
            });
        }
        res.status(200).json({
            success: true,
            code: 200,
            data: notes,
        })
    }   catch (error) {
        return res.status(500).json({
            code: 500,
            message: error.messege,
        });
    }
};

export const getAllNoteByIdController = async (req, res) => {
    try {
// request
const noteId = req.params.id;

// validation
const data = await prisma.notes.findUnique({
    where: {
        id: noteId,
    },
});

if (!data) {
    return res.status(404).json({
        success: false,
        code: 404,
        message: "id yang kamu kirim tidak ditemukan!",
    });
}
// send response
res.status(200).json({
    success: true,
    code: 200,
    message: "Berhasil mengambil data!",
    data: data,
});
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 500,
            message: error.message,
        });
    }
};

export const updateNoteByIdController = async (req, res) => {
try {
    // request
const reqId = req.params.id;
const {title, description} = req.body;

// validation req id
const notes = await prisma.notes.findUnique({
    where: {
        id: reqId,
    },
});

if(!notes){
    return res.status(404).json({
        success: false,
        code: 404,
        message: `id ${reqId} tidak ditemukan!`,
    });
}

// validation req body
if(title.length === 0){
    return res.status(400).json({
        success: false,
        code: 400,
        message: "Input title tidak boleh kosong!",
    });
}
if(description.length === 0){
    return res.status(400).json({
        success: false,
        code: 400,
        message: "Input description tidak boleh kosong!",
    });
}

// console.log("Id tersebut ketemu!")
// prosses update
await prisma.notes.update({
    where: {
        id: reqId,
    },
    data: {
        title: title,
        description: description,
    },
});
res.status(200).json({
    success: true,
    message: "note berhasil di update!",
})
} catch (error) {
    return res.status(500).json({
        success: false,
        code: 500,
        message: error.message,
    });
}
};

export const deleteNoteByIdController = async (req, res) => {
    try{

// request
const {noteId} = req.body;

// validation
if (noteId.length < 24) {
    return res.status(400).json({
        success: false,
        message: "format id ini tidak sesuai",
    });
}

// validation
const notes = await prisma.notes.findUnique({
    where: {
        id: noteId,
    },
});

if(!notes){
    return res.status(404).json({
        success: false,
        code: 404,
        message: `id ${noteId} tidak ditemukan!`,
    });
}



// proses delete
const note = await prisma.notes.delete({
    where: {
        id: noteId,
    },
});
res.status(200).json({
    success: true,
    code: 200,
    message: "data berhasil di hapus!",
    data: note,
})
    } catch (error){
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        });
    }
};