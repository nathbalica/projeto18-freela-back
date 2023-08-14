import {
    createKittenDB,
    getKittenByIdDB,
    getAllKittensDB,
    getUserKittensDB,
    updateKittenDB,
    toggleKittenStatusDB,
    deleteKittenDB,
    getUserKittenDB
  } from "../repositories/kittens.repository.js";
  
  export async function createKitten(req, res) {
    try {
      const { name, photo, description, year_old, breed, weight, localization, price } = req.body;
      const userId = res.locals.userId;
  
      const result = await createKittenDB(name, photo, description, year_old, breed, weight, localization, price, userId);
  
      res.status(201).json({
        success: true,
        kitten: result.rows[0]
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar o gatinho.'
      });
    }
  }
  
  export async function getAllKittens(req, res) {
    try {
      const result = await getAllKittensDB();
  
      res.status(200).json({
        success: true,
        kittens: result.rows
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Erro ao obter os gatinhos.'
      });
    }
  }

  export async function getUserKittens(req, res) {
    try {
      const userId = res.locals.userId;
      const result = await getUserKittensDB(userId);
  
      res.status(200).json({
        success: true,
        kittens: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error getting user\'s kittens.',
      });
    }
  }
  
  export async function getKitten(req, res) {
    try {
      const kittenId = parseInt(req.params.id);
      const result = await getKittenByIdDB(kittenId);
  
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: 'Gatinho não encontrado.'
        });
      } else {
        res.status(200).json({
          success: true,
          kitten: result.rows[0]
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Erro ao obter o gatinho.'
      });
    }
  }
  
  export async function updateKitten(req, res) {
    try {
      const kittenId = parseInt(req.params.id);
      const { name, photo, description, year_old, breed, weight, localization, price } = req.body;
      const userId = res.locals.userId;
  
      const kittenUser = await getUserKittenDB(kittenId);
  
      if (kittenUser.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Gatinho não encontrado.'
        });
      }
  
      if (kittenUser.rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Este gatinho não pertence ao usuário autenticado.'
        });
      }
  
      await updateKittenDB(kittenId, name, photo, description, year_old, breed, weight, localization, price);
  
      res.status(200).json({
        success: true,
        message: 'Gatinho atualizado com sucesso.'
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar o gatinho.'
      });
    }
  }



export async function toggleKittenStatus(req, res) {
    try {
        const kittenId = parseInt(req.params.id);
        const { active } = req.body;
        const userId = res.locals.userId; 

        const kittenUser = await getUserKittenDB(kittenId);

        if (kittenUser.rowCount === 0) {
            return res.status(404).json({ message: "Gatinho não encontrado." });
        }

        if (kittenUser.rows[0].user_id !== userId) {
            return res.status(401).json({ message: "Não autorizado: Este gatinho não pertence ao usuário." });
        }

        await toggleKittenStatusDB(active, kittenId);

        res.status(200).json({
            success: true,
            message: 'Status do gatinho atualizado com sucesso.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar o status do gatinho.'
        });
    }
}

export async function deleteKitten(req, res) {
    const kittenId = parseInt(req.params.id);
    const userId = res.locals.userId;


    try {
        const userKitten = await getUserKittenDB(kittenId);

        console.log(userKitten.rows[0])

        if (userKitten.rowCount === 0) {
            return res.status(404).json({ message: "Gatinho não encontrado." });
        }

        if (userKitten.rows[0].user_id !== userId) {
            return res.status(401).json({ message: "Não autorizado: Este gatinho não pertence ao usuário." });
        }

        await deleteKittenDB(kittenId);

        res.status(204).json({
            success: true,
            message: 'Gatinho deletado com sucesso.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir o gatinho.'
        });
    }
}
