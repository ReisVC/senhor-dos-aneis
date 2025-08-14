import { Request, Response } from 'express';
import { connection } from '../config/database';

export class CharacterController {
  async list(req: Request, res: Response): Promise<Response> {
    const [rows]: any = await connection.query('SELECT * FROM characters');

    const result = rows.map((i: { type: string; }) => {
        let message = "";
        if(i.type == "Sociedade") message = "Corram seus tolos!";
        if(i.type == "Nazgûl") message = "Os Nazgûl não estão em Moria.";
        if(i.type == "Balrog") message = "Você não vai passar!";
        return { ...i, message}
    })

    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM characters WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
    }

    let message = "";
    if(rows[0].type == "Sociedade") message = "Corram seus tolos!";
    if(rows[0].type == "Nazgûl") message = "Os Nazgûl não estão em Moria.";
    if(rows[0].type == "Balrog") message = "Você não vai passar!";

    const result = {...rows[0], message}
    return res.status(200).json(result);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, type, race, weapon, status } = req.body;
    await connection.query('INSERT INTO characters (name, type, race, weapon, status) VALUES (?, ?, ?, ?, ?)', [name, type, race, weapon, status]);
    if(type == "Nazgûl") {
        return res.status(201).json({ atualizacao: 'Personagem criado com sucesso!', mensagem: 'Frodo sente o Um Anel querendo retornar ao seu Mestre...' });
    }
    return res.status(201).json({ mensagem: 'Personagem criado com sucesso!' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;  
    const { name, type, race, weapon, status } = req.body;
    await connection.query('UPDATE characters SET name = ?, type = ?, race = ?, weapon = ?, status = ? WHERE id = ?', [name, type, race, weapon, status, id]);
    if(type == "Nazgûl") {
        return res.status(200).json({ atualizacao: 'Personagem criado com sucesso!', mensagem: 'Frodo sente o Um Anel querendo retornar ao seu Mestre...' });
    }
    return res.status(200).json({ mensagem: 'Personagem atualizado!' });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT type FROM characters WHERE id = ?', [id]);
    const { type } = rows[0];
    if(type == "Nazgûl") {
        return res.status(200).json({ mensagem: "Frodo sente o Um Anel querendo retornar ao seu Mestre..." });
    }
    await connection.query('DELETE FROM characters WHERE id = ?', [id]);
    return res.status(204).send();
  }
}