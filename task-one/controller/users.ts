import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

uuidv4();

let isExists = fs.existsSync("./database.json");

if(isExists === false) {
  fs.writeFileSync("./database.json", '[]')
}

let database = JSON.parse(fs.readFileSync("./database.json", "utf8"));

interface Users {
  "userId": string,
  "organization": string,
  "createdAt": string,
  "updatedAt": string,
  "products": [
    string
  ],
  "marketValue": string,
  "address": string,
  "ceo": string,
  "country": string,
  "noOfEmployees": number,
  "employees": [
    string,
    string
  ]
}

export const getUser = (req: any, res: { send: (arg0: any[]) => void; }, next: any) => {
  const { id } = req.params;

  database.forEach((item: any | { [x: string]: string; }, index: string | number) => {
    if(item['userId'] == id){
      res.send(item)
    }
  });
}

export const getUsers = (req: { params: { id: string; }; }, res: { send: (arg0: any) => void; }, next: string) => {
  if(isExists == true) {
    fs.readFile('./database.json', 'utf8', (err, content) => {
      res.send(content);
    });
  } else {
    res.send('Database is empty');
  }
}

export const createUser = (req: { body: any; }, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: any) => void; }, next: string) => {
  let body = req.body;
  let id = uuidv4()
  let userWithId = { userId: id, ...body };
  fs.readFile('./database.json', 'utf8', function(err, data){
    let readData = JSON.parse(data);
    readData.push(userWithId);
    fs.writeFile('./database.json', JSON.stringify(readData, null, 2), "utf8", err => console.log(err));
  });

  res.send(userWithId);
}

export const updateUser = (req: { params: { id: string; }; body: any; }, res: { send: (arg0: string) => void; }, next: string) => {
  const { id } = req.params;

  let updated: Users = req.body;
  const {  userId, organization, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees, employees } = updated;

  let newDate = new Date();

  let detailsData = {
    userId: userId || updated.userId,
    organization: organization || updated.organization,
    createdAt: createdAt || updated.createdAt,
    updatedAt: newDate.toISOString(),
    products: products || updated.products,
    marketValue: marketValue || updated.marketValue,
    address: address || updated.address,
    ceo: ceo || updated.ceo,
    country: country || updated.country,
    noOfEmployees: noOfEmployees || updated.noOfEmployees,
    employees: employees || updated.employees,
  }
  
  database.forEach((item: string[] | any, index: number) => {
    if(item['userId'] === id){
          database[index] = detailsData;
          fs.writeFile('./database.json', JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
        }
  })
  res.send(JSON.stringify(detailsData, null, 2));
}

export const deleteUser = (req: { params: { id: string; }; }, res: { send: (arg0: string) => void; }, next: any) => {
  const { id } = req.params;
  
  database.forEach((item: string[] | any, index: number) => {
    if(item['userId'] === id) {
      database.splice(index, 1);
      fs.writeFile('./database.json', JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
      }
  })
  res.send(`${id} deleted`);
}