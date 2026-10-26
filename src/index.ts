// PREPARING THE TERRAIN
import express from "express";
import type { Request, Response } from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

// THE MANGA LIBRARY
interface book { 
    id: number;
    title: string;
    author: string;
    pages: number;
    available: boolean;
}

const bookList: book[] = [
    { id:1, title: "Naruto", author: "Masashi Kishimoto", pages: 200, available: true},
    { id:2, title: "One Piece", author: "Eiichiro Oda", pages: 1000, available: true},
    { id:3, title: "Dragon Ball", author: "Akira Toriyama", pages: 500, available: true},
    { id:4, title: "Demon Slayer", author: "Koyoharu Gotouge", pages: 200, available: true},
    { id:5, title: "Jujutsu Kaisen", author: "Gege Akutami", pages: 200, available: true},
    { id:6, title: "My Hero Academia", author: "Kohei Horikoshi", pages: 200, available: true},
    { id:7, title: "Attack on Titan", author: "Hajime Isayama", pages: 200, available: true},
    { id:8, title: "Spy x Family", author: "Tatsuya Endo", pages: 200, available: true},
    { id:9, title: "Chainsaw Man", author: "Tatsuki Fujimoto", pages: 200, available: true},
    { id:10, title: "Tokyo Ghoul", author: "Sui Ishida", pages: 200, available: true},
];

// GET ALL THE BOOKS
app.get("/api/books", function(req: Request, res: Response){
    res.status(200).json({
      ok: true,
      messaje: `Book List`,
      total: bookList.length,
      data: bookList,  
    })
} );

// GET A BOOK BY ID
app.get(`/api/books/:id`, function(req: Request, res: Response){
    const searchedId = Number(req.params.id);
    const foundBook = bookList.find(
        (b) => b.id === searchedId,
    )
    if (!foundBook){
        return res.status(404).json({
            ok: false,
            messaje: `That book is not in our store 😪.`,
        });
    }
    res.status(200).json({
        ok: true,
        data: foundBook,
    });
});

// POST A NEW BOOK
app.post(`/api/books`, function(req: Request, res: Response){
    const {title, author, pages, available} = req.body;
    let newBook: book = {
        id: bookList.length+1,
        title,
        author,
        pages,
        available,
    };
    bookList.push(newBook);
    res.status(201).json({
    ok: true,
    message: `${newBook.title} has been added successfully!`,
    data: newBook,
    });
});

// PUT (UPDATE) AN EXISTING BOOK
app.put(`/api/books/:id`, function(req:Request, res:Response){
    const searchedId = Number(req.params.id);
    const book = bookList.find((b) => b.id === searchedId);
    if (!book){
        return res.status(404).json({
            ok: false,
            messaje: `This book isn't in the store 😪`,
        });
    };
    const {title, author, pages, available} = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.pages = pages || book.pages;
    book.available = available || book.available;

    res.status(200).json({
        ok: true,
        message: `Book updated successfully!`, 
        data: book,
    });
});

//DELETE A BOOK BY ID
app.delete(`/api/books/:id`, function(req:Request, res:Response){
    const searchedId = Number(req.params.id);
    const bookIndex = bookList.findIndex((b) => b.id === searchedId);
    if (bookIndex === -1){
        return res.status(404).json({
            ok: false,
            messaje: `This book isn't in the store 😪`,
        });
    };
    bookList.splice(bookIndex, 1);
    res.status(200).json({
        ok: true,
        message: `Book deleted successfully!`, 
    });
});

app.listen(PORT, function(){
    console.log(`Server running on: http://localhost:${PORT}`);
})

