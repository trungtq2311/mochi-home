// Build and publish dist/ to the gh-pages branch (GitHub Pages serves it).
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });
const remote = execSync('git remote get-url origin').toString().trim();

run('npm run build');
writeFileSync('dist/.nojekyll', '');
run('git init -q -b gh-pages', { cwd: 'dist' });
run('git add -A', { cwd: 'dist' });
run('git -c user.name=deploy -c user.email=deploy@localhost commit -q -m "Deploy"', { cwd: 'dist' });
run(`git push -q -f "${remote}" gh-pages`, { cwd: 'dist' });
console.log('Deployed to gh-pages.');
