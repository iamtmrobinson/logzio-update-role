require('dotenv').config();

const got = require('got');

const apiToken = process.env.LOGZ_API_TOKEN;
const ADMIN_ACCESS_ROLE_ID = 3; // See Request Body Schema (https://docs.logz.io/api/#operation/updateUser)
const requestOptions = {
  prefixUrl: 'https://api.logz.io/', 
  headers: {
    'X-API-TOKEN': apiToken,
  }
};

const updateUser = async (user) => {
  const updatedUser = { username: user.username, fullName: user.fullName, accountID: user.accountID, roles: [ ADMIN_ACCESS_ROLE_ID ] };

  try {
    await got.put(`v1/user-management/${user.id}`, { ...requestOptions, json: {
        ...updatedUser
      } 
    });
    console.log(`Updated ${user.fullName} to admin`);
    return;
  } catch (error) {
    console.log({ ...requestOptions, json: {
        ...updatedUser
      } 
    });
    console.warn(`Failed to update ${user.fullName}: ${error.message}`);
  }
}

(async () => {  
  if (!apiToken) {
    console.error(`No API token provided.`);
    return; 
  }

  try {
    const { body } = await got('v1/user-management', requestOptions);

    const users = JSON.parse(body);
    console.log(`Found ${users.length} user(s)`);

    const nonAdminUsers = users.filter(user => user.active === true && !user.roles.includes(ADMIN_ACCESS_ROLE_ID));
    console.log(`  of which ${nonAdminUsers.length} are active and do not have admin privileges`);

    for (const user of nonAdminUsers) {
      await updateUser(user);
    }

    console.log('Done.');
  } catch (error) {
    console.error(`Failed to find or update users: ${error.message}`, error);
  }
})();
