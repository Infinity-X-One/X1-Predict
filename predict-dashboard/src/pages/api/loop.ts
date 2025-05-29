import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    exec('python ../../../../main.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Exec error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        console.warn(`⚠️ stderr: ${stderr}`);
      }
      console.log(`✅ stdout:\n${stdout}`);
      res.status(200).json({ status: 'Prediction loop triggered successfully.', output: stdout });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
