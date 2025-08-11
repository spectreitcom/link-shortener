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
import { MyPagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import { SELF_URL } from "@/lib/constants";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function AppPage({ searchParams }: Props) {
  const { page = 1 } = await searchParams;

  return (
    <div>
      <ShortUrlForm />

      <div className={"mt-8"}>
        <Suspense fallback={<SkeletonLoader />}>
          <List currentPage={+page} />
        </Suspense>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <>
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-8 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-64" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </>
  );
}

function NoData() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <div className="rounded-full bg-muted p-4 mb-4">
          <LinkIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">
          No shortened URLs yet
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Start by creating your first shortened URL using the form above. All
          your shortened links will appear here for easy management.
        </p>
      </CardContent>
    </Card>
  );
}

async function List({ currentPage }: { currentPage: number }) {
  const { urls, totalPages } = await getUserUrls(currentPage);

  if (!urls.length) return <NoData />;

  return (
    <>
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
                <CopyToClipboardButton content={`${SELF_URL}/${url.code}`} />
              </TableCell>
              <TableCell>
                <Link href={`/app/${url.id}`}>{`${SELF_URL}/${url.code}`}</Link>
              </TableCell>
              <TableCell>{truncate(url.originalUrl, 100)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MyPagination
        className={"mt-4"}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}
