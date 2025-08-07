import { ShortUrlForm } from "@/features/app/components/short-url-form";
import { getUserUrls } from "@/features/app/actions";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncate } from "@/lib/utils";
import { CopyToClipboardButton } from "@/features/app/components/copy-to-clipboard-button";

export default async function AppPage() {
  return (
    <div>
      <ShortUrlForm />

      <div className={"mt-8"}>
        <Suspense fallback={<div>Loading...</div>}>
          <List />
        </Suspense>
      </div>
    </div>
  );
}

async function List() {
  const { urls, totalPages } = await getUserUrls();

  return (
    <Table>
      <TableCaption>Your shorten urls</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Shorten url</TableHead>
          <TableHead>Original url</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.map((url) => (
          <TableRow key={url.id}>
            <TableCell>
              <CopyToClipboardButton
                content={`http://localhost:3000/${url.code}`}
              />
            </TableCell>
            <TableCell>{`http://localhost:3000/${url.code}`}</TableCell>
            <TableCell>{truncate(url.originalUrl, 100)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
