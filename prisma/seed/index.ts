import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial scam reports
  await prisma.scamReport.createMany({
    data: [
      {
        url: 'https://fake-crypto-investment.com',
        title: 'Fake Crypto Investment Scheme',
        description: 'Promises unrealistic returns on cryptocurrency investments',
        isScam: true,
        reportCount: 5,
        status: 'VERIFIED'
      },
      {
        url: 'https://phishing-bank-site.com', 
        title: 'Bank Phishing Website',
        description: 'Fake banking website trying to steal credentials',
        isScam: true,
        reportCount: 3,
        status: 'VERIFIED'
      },
      {
        url: 'https://legitimate-business.com',
        title: 'Legitimate Business',
        description: 'Verified legitimate e-commerce site',
        isScam: false,
        reportCount: 1,
        status: 'VERIFIED'
      }
    ]
  });

  // Add some evidence
  await prisma.evidence.createMany({
    data: [
      {
        scamReportId: (await prisma.scamReport.findFirst({
          where: { url: 'https://fake-crypto-investment.com' }
        }))?.id as string,
        description: 'Multiple users reported losing money through this platform',
        imageUrls: []
      },
      {
        scamReportId: (await prisma.scamReport.findFirst({ 
          where: { url: 'https://phishing-bank-site.com' }
        }))?.id as string,
        description: 'Site mimics legitimate bank but has suspicious domain',
        imageUrls: []
      }
    ]
  });

  // Add some discussions
  await prisma.discussion.createMany({
    data: [
      {
        scamReportId: (await prisma.scamReport.findFirst({
          where: { url: 'https://fake-crypto-investment.com' }
        }))?.id as string,
        message: 'I almost fell for this scam. Thank you for the warning!'
      },
      {
        scamReportId: (await prisma.scamReport.findFirst({
          where: { url: 'https://phishing-bank-site.com' }
        }))?.id as string,
        message: 'The site looks very similar to the real bank website. Be careful!'
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
