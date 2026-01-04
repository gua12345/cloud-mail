import app from '../hono/hono';
import result from '../model/result';
import publicService from '../service/public-service';
import accountService from '../service/account-service';

app.post('/public/genToken', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});

app.post('/public/emailList', async (c) => {
	const list = await publicService.emailList(c, await c.req.json());
	return c.json(result.ok(list));
});

app.post('/public/addUser', async (c) => {
	await publicService.addUser(c, await c.req.json());
	return c.json(result.ok());
});

app.post('/public/account/add', async (c) => {
	const params = await c.req.json();
	const { userId } = params;
	const account = await accountService.add(c, params, userId);
	return c.json(result.ok(account));
});

app.delete('/public/account/delete', async (c) => {
	const params = c.req.query();
	const { userId } = params;
	await accountService.delete(c, params, userId);
	return c.json(result.ok());
});
