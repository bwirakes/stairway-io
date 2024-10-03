import { Heir } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, ChevronDown } from 'lucide-react'

interface HeirsTableProps {
  heirs: Heir[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit: (heir: Heir) => void;
}

export function HeirsTable({ heirs, searchTerm, onSearchChange, onEdit }: HeirsTableProps) {
  return (
    <div className="w-full bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      {/* Search */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="relative max-w-xs">
          <label htmlFor="hs-table-search" className="sr-only">Search</label>
          <Input
            type="text"
            name="hs-table-search"
            id="hs-table-search"
            placeholder="Search heirs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-gray-700 dark:text-neutral-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
            <Search className="h-3.5 w-3.5 text-gray-400" />
          </div>
        </div>
      </div>
      {/* End Search */}

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="ps-6 py-3 text-start">
              <span className="sr-only">Checkbox</span>
            </th>
            <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Name
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Relation
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Phone
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Address
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Target Percentage
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-end"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {heirs.map((heir) => (
            <tr key={heir.id}>
              <td className="size-px whitespace-nowrap">
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                  <div className="flex items-center gap-x-3">
                    <div className="grow">
                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{`${heir.first_name} ${heir.last_name}`}</span>
                      <span className="block text-sm text-gray-500 dark:text-neutral-500">{heir.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="px-6 py-3">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">{heir.relation || 'N/A'}</span>
                </div>
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="px-6 py-3">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">{heir.phone}</span>
                </div>
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="px-6 py-3">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">{`${heir.street_address_1}, ${heir.city}, ${heir.state} ${heir.zipcode}`}</span>
                </div>
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="px-6 py-3">
                  <span className="text-sm text-gray-500 dark:text-neutral-500">{`${heir.target_percentage}%`}</span>
                </div>
              </td>
              <td className="size-px whitespace-nowrap">
                <div className="px-6 py-1.5">
                  <Button variant="link" onClick={() => onEdit(heir)}>
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* End Table */}

      {/* Footer */}
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
        <div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            <span className="font-semibold text-gray-800 dark:text-neutral-200">{heirs.length}</span> results
          </p>
        </div>

        <div>
          <div className="inline-flex gap-x-2">
            <Button variant="outline" size="sm">
              <ChevronDown className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
      {/* End Footer */}
    </div>
  )
}