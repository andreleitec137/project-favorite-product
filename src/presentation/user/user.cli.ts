import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/infrastructure/core/app.module';
import CreateUserUseCase from 'src/application/user/use-cases/create-user';
import { CreateUserInputDTO } from 'src/application/user/dto/create-user.input.dto';

void (async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  const createUser = appContext.get(CreateUserUseCase);

  const args = process.argv.slice(2);
  const params = args.reduce(
    (acc, curr) => {
      const [key, val] = curr.split('=');
      if (key && val) acc[key.replace('--', '')] = val;
      return acc;
    },
    {} as Record<string, string>,
  );

  const email = params.email;
  const password = params.password;

  if (!email || !password) {
    console.error('Usage: user.cli.ts --email=<email> --password=<password>');
    process.exit(1);
  }

  try {
    const input: CreateUserInputDTO = {
      email,
      password,
      name: email.split('@')[0],
    };
    const output = await createUser.execute(input);
    console.log('✅ User created:', output);
    await appContext.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await appContext.close();
    process.exit(1);
  }
})();
