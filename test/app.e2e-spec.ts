import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { AppModule } from "src/app.module";

describe('App e2e',()=>{
  let app : INestApplication;
  let prisma:PrismaService
  beforeAll(async ()=>{
    const moduleRef = 
    await Test.createTestingModule({
      imports:[AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true
      })
    )
    await app.init() 

    prisma = app.get(PrismaService)

    await prisma.cleanDb()
  }) 
  afterAll(()=>{
    app.close()
  })

  describe('Auth',()=>{
    describe('Signup',()=>{
      it.todo("Shound signup")
    })
    describe('Signin',()=>{
      it.todo("Shound signin")
    })
  })

  describe('User',()=>{
    describe('Get me',()=>{})
    describe('Edit user',()=>{})

  })

  describe('Bookmarks',()=>{
    describe('Create bookmark',()=>{})
    describe('Get bookmarks',()=>{})
    describe('Get bookmarks by id',()=>{})
    describe('edit bookmarks',()=>{})
    describe('Delete Bookmarks',()=>{})

  })
})
