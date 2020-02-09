import { spawn } from 'child_process';

export function npmRun(script: string) {
  return new Promise((resolve, reject) =>
    spawn('npm', ['run', script], {
      stdio: 'inherit',
      shell: true
    }).on('close', exitCode => (exitCode === 0 ? resolve() : reject()))
  );
}
